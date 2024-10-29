// page.tsx (Server-side fetching in the page function)
import { fetchSAccountPlanTypes, fetchBranch } from "@/app/lib/data"; // import your API functions
import { PlanType, Branch } from "@/app/lib/definitions"; // import your interfaces
import { CreateAccountForm } from "@/app/ui/dashboard/createAccount/create-account-form";

export default async function Page() {
  try {
    // Fetch the plan types and branches data server-side
    const planTypes: PlanType[] = await fetchSAccountPlanTypes();
    const branches: Branch[] = await fetchBranch();

    // console.log(planTypes);
    // console.log(branches);
    

    return (
      <div>
        <h1>Create Account</h1>
        <CreateAccountForm planTypes={planTypes} branches={branches} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load data.</div>;
  }
}
