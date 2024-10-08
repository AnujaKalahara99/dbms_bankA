import SideNav from "@/app/ui/dashboard/sidenav";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { auth } from "@/auth";

export const experimental_ppr = true;

export default async function Layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const authData = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav user={authData?.user} />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
