import { getEmployees } from "@/app/lib/data"; // Import the data fetching function
import ManagerDashboard from "@/app/ui/dashboard/manager/employeeDetails/EmployeeDetails"; // Import the dashboard component

export default async function Page() {
  try {
    const employees = await getEmployees(); // Fetch employee details

    return (
      <div>
        <h1>Manager Dashboard</h1>
        <ManagerDashboard employees={employees} />  {/* Pass employees to the dashboard */}
      </div>
    );
  } catch (error) {
    console.error('Error fetching employees:', error);
    return <div>Failed to load employee data.</div>;
  }
}
