// import { getEmployees } from "@/app/lib/data"; // Import the data fetching function
// import ManagerDashboard from "@/app/ui/dashboard/manager/employeeDetails/EmployeeDetails";
// import { auth } from "@/auth";
// import notFound from "../../not-found";

// export default async function Page() {

//   const session = await auth();
//   const id = session?.user?.id;
//   if (!id || !session?.user?.isEmployee) {
//     notFound();
//   }
//   try {
    
//     const employees = await getEmployees(id as string); // Fetch employee details
    
//     return (
//       <div>
//         <h1>Manager Dashboard</h1>
//         <ManagerDashboard employees={employees} />  {/* Pass employees to the dashboard */}
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     return <div>Failed to load employee data.</div>;
//   }
// }

import { getEmployees } from "@/app/lib/data"; // Import the data fetching function
import ManagerDashboard from "@/app/ui/dashboard/manager/employeeDetails/EmployeeDetails";
import { auth } from "@/auth";
import notFound from "../../not-found";
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id || !session?.user?.isEmployee) {
    notFound();
  }

  try {
    const employees = await getEmployees(id as string); // Fetch employee details

    return (
      <main className="p-6">
        <h1 className={`${lusitana.className} mb-6 text-2xl`}>Manager Dashboard</h1>
        <ManagerDashboard employees={employees} /> {/* Pass employees to the dashboard */}
      </main>
    );
  } catch (error) {
    console.error("Error fetching employees:", error);
    return (
      <main className="p-6">
        <h1 className={`${lusitana.className} mb-6 text-2xl`}>Manager Dashboard</h1>
        <div className="text-red-600">Failed to load employee data.</div>
      </main>
    );
  }
}
