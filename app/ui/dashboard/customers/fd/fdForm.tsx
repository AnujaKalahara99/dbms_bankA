
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Account, FDPlan } from "@/app/lib/data";
import { createFD } from "@/app/lib/actions"; // Import createFD function

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function FDForm({ accounts, fdPlans }: { accounts: Account[], fdPlans: FDPlan[] }) {
  const [formData, setFormData] = useState({
    accountId: accounts.length ? accounts[0].Account_ID : '',
    amount: '',
    fdPlan: fdPlans.length ? fdPlans[0].FD_Plan_ID : '',
    startDate: getTodayDate(),  // Set today's date as default
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("accountId", formData.accountId);
      form.append("amount", formData.amount);
      form.append("fdPlan", formData.fdPlan);
      form.append("startDate", formData.startDate);

      const result = await createFD(form); // Call createFD with form data

      if (result.success) {
        router.push('/dashboard/fd');
      } else {
        alert("Error creating FD");
      }
    } catch (error) {
      console.error("Error creating FD:", error);
      alert("Error creating FD");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mt-4">
      <div>
        <label>Account ID</label>
        <select
          value={formData.accountId}
          name={"accountId"}
          onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
          className="border p-2 rounded w-full"
        >
          {accounts.map((account) => (
            <option key={account.Account_ID} value={account.Account_ID}>
              {account.Account_ID} (Balance: {account.Balance})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>FD Plan</label>
        <select
          value={formData.fdPlan}
          name="fdPlan"
          onChange={(e) => setFormData({ ...formData, fdPlan: e.target.value })}
          className="border p-2 rounded w-full"
        >
          {fdPlans.map((plan) => (
            <option key={plan.FD_Plan_ID} value={plan.FD_Plan_ID}>
              {plan.Period_in_Months} Months
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="text"
          name="startDate"
          value={formData.startDate}
          readOnly
          className="border p-2 rounded w-full bg-gray-200 cursor-not-allowed"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit</button>
    </form>
  );
}
