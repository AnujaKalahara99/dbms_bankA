"use client";
import { Employee } from "@/app/lib/data";

export default function ManagerDashboard({ employees }: { employees: Employee[] }) {
  return (
    <div>
      <h2>Employee List</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">NIC</th>

          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.Employee_ID}>
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
    </div>
  );
}
