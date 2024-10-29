"use client";

import { Branch, FullCustomerDetails, PlanType } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useState, useActionState } from "react";
import { createAccount } from "@/app/lib/actions";

export function CreateAccountForm({
    planTypes,
    branches,
  }: {
    planTypes: PlanType[];
    branches: Branch[];
  }) {
  const [isEditing, setIsEditing] = useState(false);
  const [accountType, setAccountType] = useState(''); // State for account type
  const [planType, setPlanType] = useState(''); // State for plan type
  const [branch, setBranch] = useState(''); // State for selected branch
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages

  const fields = [
    {
      Title: "Customer ID",
      Type: "string",
      ID: "customer_id",
      Placeholder: "Enter Customer ID",
      canEdit: false,
    },
    {
      Title: "Balance",
      Type: "number",
      ID: "balance",
      Placeholder: "Enter balance",
      canEdit: true,
    },
    {
      Title: "Account Type",
      Type: "radio",
      ID: "account_type",
      Placeholder: "Enter Address Line 2",
      canEdit: true,
    }
  ];

  // Handle account type change
  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== undefined) {
      setAccountType(value); // Update selected plan type
      setPlanType('');  // Reset plan type when account type changes
    }
  };

  const handlePlanTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value !== undefined) {
      setPlanType(value); // Update selected plan type
    } // Update selected plan type
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value !== undefined) {
      setBranch(value); // Update selected branch
    } // Update selected branch
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message

    const formData = new FormData(event.currentTarget);

    // Call createAccount and handle response
    const response = await createAccount(formData);
    if (response.success) {
      setSuccess("Account created successfully!"); // Set success message
      window.location.reload(); // Optionally reload the page
    } else {
      setError(response.message || "An unknown error occurred."); // Set error message
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Error message display */}
      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div key={"customer_id"} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {"Customer ID"}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                  <input
                    id={"customer_id"}
                    name={"customer_id"}
                    type={"string"}
                    placeholder={"Enter Customer ID"}
                    className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 border-gray-300`}
                  />
              </div>
            </div>
          </div>

          <div key={"Balance"} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {"Balance"}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                  <input
                    id={"Balance"}
                    name={"balance"}
                    type={"number"}
                    placeholder={"Enter Balance"}
                    className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 border-gray-300`}
                  />
              </div>
            </div>
          </div>

          <div key={"account_type"} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {"Account Type"}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                    <label style={{ marginLeft: '20px', marginRight: '20px' }}>
                    <input className="mr-2"
                        type="radio"
                        name="account_type"
                        value="Current"
                        checked={accountType === 'Current'}
                        onChange={handleAccountTypeChange}
                    />
                    Current
                    </label>
                    <label style={{ marginRight: '20px' }}>
                    <input className="mr-2"
                        type="radio"
                        name="account_type"
                        value="Saving"
                        checked={accountType === 'Saving'}
                        onChange={handleAccountTypeChange}
                    />
                    Saving
                    </label>

                    {accountType === 'Saving' && (
                    <div className="mb-4">
                        <label htmlFor="plan_type" className="mb-2 block text-sm font-medium">
                        Select Plan Type
                        </label>
                        <select
                        id="plan_type"
                        name="plan_type"
                        value={planType}
                        onChange={handlePlanTypeChange}
                        className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        >
                        <option value="">Select Plan Type</option>
                        {planTypes.map((plan) => (
                            <option key={plan.Plan_ID} value={plan.Plan_ID}>
                            {plan.Plan_Name}
                            </option>
                        ))}
                        </select>
                    </div>
                    )}
                </div>  
           </div>
        </div>

        <div key={"branch"} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {"Branch"}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
              <select
                      id="branch"
                      name="branch"
                      value={branch}
                      onChange={handleBranchChange}
                      className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 border-gray-300`}
                >
                      <option value="">Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.Branch_ID} value={branch.Branch_ID}>
                          {branch.Name}
                        </option>
                      ))}
                    </select>
              </div>
            </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>

        <Button type="submit">Create Account</Button>
      </div>
    </form>
  );
}