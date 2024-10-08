import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
// import type { User } from "@/app/lib/definitions";
import { authConfig } from "./auth.config";
import { connectToDatabase } from "./app/lib/mysql";

export async function getUser(email: string) {
  try {
    const mysql = await connectToDatabase();

    let customer = false,
      employee = false,
      manager = false;
    let rows: any[] = [];
    rows = await mysql.query(`SELECT * FROM Customer WHERE email=?`, [email]);
    if (rows[0].length === 0) {
      rows = await mysql.query(`SELECT * FROM Employee WHERE email=?`, [email]);
      if (rows[0].length === 0) {
        return undefined;
      }
      employee = true;
      manager = rows[0][0].Is_Manager == 1 || rows[0][0].Is_Manager == true;
    } else customer = true;

    const userData = rows[0][0];

    const user = {
      id: customer ? userData.Customer_ID : userData.Employee_ID,
      Name: userData.Name,
      Email: userData.Email,
      Password: userData.Password,
      Is_Customer: customer,
      Is_Employee: employee,
      Is_Manager: manager,
    };

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.Password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
