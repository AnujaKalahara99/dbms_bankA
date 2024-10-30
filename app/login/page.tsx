import BankALogo from "@/app/ui/bankA-logo";
import LoginForm from "@/app/ui/login-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth();

  // Redirect to the dashboard if the user is logged in
  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center h-screen flex-col md:flex-row">
      <div className="relative flex w-full h-full max-w-[400px] flex-col justify-center space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <BankALogo />
          </div>
        </div>
        <LoginForm />
      </div>
      <div className="relative flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`mb-3 text-xl`}>Mock Login Credentials</h1>
          <div className="w-full py-2">
            <b>Customer Emails</b>
            <p>
              use <u>john.doe@example.com</u> or <u>jane.smith@example.com</u>{" "}
              with password <i>customer</i>
            </p>
          </div>
          <div className="w-full py-2">
            <b>Employee Email</b>
            <p>
              use <u>susa@putbooruwa.com</u> with password <i>employee</i>
            </p>
          </div>
          <div className="w-full py-2">
            <b>Manager Email</b>
            <p>
              use <u>nariya@peradeniya.com</u> or <u>haraka@thanakola.com</u>
              with password <i>employee</i>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
