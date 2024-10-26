import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  session: {
    // Set session maxAge (in seconds)
    maxAge: 60 * 60, // 1 hr
    // How often to update the session token (in seconds)
    updateAge: 5 * 60, // 5 min
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      // Persist the user in the token after the first login
      if (user) {
        token.id = user.id;
        token.email = user.Email;
        token.name = user.Name;
        token.isCustomer = user.Is_Customer;
        token.isEmployee = user.Is_Employee;
        token.isManager = user.Is_Manager;
      }
      return token;
    },

    async session({ session, token }) {
      // Pass token info into the session object
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        isCustomer: token.isCustomer as boolean,
        isEmployee: token.isEmployee as boolean,
        isManager: token.isManager as boolean,
      };

      return session;
    },
  },
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface User {
    id?: string;
    Name: string;
    Email: string;
    Password: string;
    Is_Customer: boolean;
    Is_Employee: boolean;
    Is_Manager: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isCustomer: boolean;
      isEmployee: boolean;
      isManager: boolean;
    };
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    isCustomer: boolean;
    isEmployee: boolean;
    isManager: boolean;
  }
}
