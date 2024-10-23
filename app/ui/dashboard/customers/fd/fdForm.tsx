"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Account, FDPlan } from "@/app/lib/data";

export default function FDForm({ accounts, fdPlans }: { accounts: Account[], fdPlans: FDPlan[] }) {
  const [formData, setFormData] = useState({
    accountId:  accounts.length ? accounts[0].Account_ID : '',
    amount: '',
    fdPlan: fdPlans.length ? fdPlans[0].FD_Plan_ID : '',
    startDate: '',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/fd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push('/dashboard/customerOnly/fd');
    } else {
      alert("Error creating FD");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg mt-4">
<div>
        <label>Account ID</label>
        <select
          value={formData.accountId}
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
      {/* Amount */}
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label>FD Plan</label>
        <select
          value={formData.fdPlan}
          onChange={(e) => setFormData({ ...formData, fdPlan: e.target.value })}
          className="border p-2 rounded w-full"
        >
          {fdPlans.map((plan) => (
            <option key={plan.FD_Plan_ID} value={plan.FD_Plan_ID}>
              {plan.Period_in_Months}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit</button>
    </form>
  );
}