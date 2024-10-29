// "use client";
import { Employee } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";

export default function ManagerDashboard({ employees }: { employees: Employee[] }) {
  return (
    <main className="p-6">
      <h2 className={`${lusitana.className} mb-6 text-2xl`}>Employee List</h2>
      <table className="table-auto w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-3 text-left font-semibold">Employee ID</th>
            <th className="border px-4 py-3 text-left font-semibold">Name</th>
            <th className="border px-4 py-3 text-left font-semibold">Address</th>
            <th className="border px-4 py-3 text-left font-semibold">City</th>
            <th className="border px-4 py-3 text-left font-semibold">Phone Number</th>
            <th className="border px-4 py-3 text-left font-semibold">Email</th>
            <th className="border px-4 py-3 text-left font-semibold">NIC</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.Employee_ID} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{employee.Employee_ID}</td>
              <td className="border px-4 py-2">{employee.Name}</td>
              <td className="border px-4 py-2">{employee.Address_Line_1} {employee.Address_Line_2}</td>
              <td className="border px-4 py-2">{employee.City}</td>
              <td className="border px-4 py-2">{employee.Phone_Number}</td>
              <td className="border px-4 py-2">{employee.Email}</td>
              <td className="border px-4 py-2">{employee.NIC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
