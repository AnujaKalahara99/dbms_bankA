"use client";

import { FullCustomerDetails } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useState } from "react";
import { updateCustomer } from "@/app/lib/actions";

export default function EditInvoiceForm({
  customer,
}: {
  customer: FullCustomerDetails;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    {
      Title: "Name",
      Value: customer.Name,
      Type: "string",
      ID: "name",
      Placeholder: "Enter Customer Name",
      canEdit: true,
    },
    {
      Title: "Customer ID",
      Value: customer.Customer_ID,
      Type: "string",
      ID: "customer_id",
      Placeholder: "Enter Customer ID",
      canEdit: false,
    },
    {
      Title: "Address Line 1",
      Value: customer.Address_Line_1,
      Type: "string",
      ID: "address_line_1",
      Placeholder: "Enter Address Line 1",
      canEdit: true,
    },
    {
      Title: "Address Line 2",
      Value: customer.Address_Line_2,
      Type: "string",
      ID: "address_line_2",
      Placeholder: "Enter Address Line 2",
      canEdit: true,
    },
    {
      Title: "City",
      Value: customer.City,
      Type: "string",
      ID: "city",
      Placeholder: "Enter City",
      canEdit: true,
    },
    {
      Title: "Phone Number",
      Value: customer.Phone_Number,
      Type: "string",
      ID: "phone_number",
      Placeholder: "Enter Phone Number",
      canEdit: true,
    },
    {
      Title: "Email",
      Value: customer.Email,
      Type: "string",
      ID: "email",
      Placeholder: "Enter Email",
      canEdit: false,
    },
    {
      Title: "Total Balance",
      Value: customer.Total_Balance,
      Type: "number",
      ID: "total_balance",
      Placeholder: "Enter Total Balance",
      canEdit: false,
    },
  ];

  return (
    <form
      action={async (formData) => {
        await updateCustomer(formData);
        window.location.reload();
      }}
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Fields */}
        {fields.map((field) => (
          <div key={field.ID} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {field.Title}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  readOnly={!isEditing || !field.canEdit}
                  id={field.ID}
                  name={field.ID}
                  type="string"
                  defaultValue={field.Value}
                  placeholder={field.Placeholder}
                  className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                    !isEditing || !field.canEdit
                      ? "bg-gray-100 border-gray-200"
                      : "border-gray-300"
                  }`}
                />
                {field.ID === "total_balance" && (
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Space */}
      <div className="my-6"> Account Details </div>

      {/* Accounts */}
      {customer.Accounts.map((account, index) => (
        <div
          key={index + " acc_number"}
          className="rounded-md bg-gray-50 p-4 md:p-6 mb-6"
        >
          <div className="mb-4">
            <label
              htmlFor="acc_number"
              className="mb-2 block text-sm font-medium"
            >
              Account Number
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="string"
                  defaultValue={account.Account_ID}
                  placeholder={"XXX-XXX-XXX"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div key={index + " branch"} className="mb-4">
            <label htmlFor="branch" className="mb-2 block text-sm font-medium">
              Branch
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="string"
                  defaultValue={`${account.Branch_ID} - ${account.Branch_Name}`}
                  placeholder={"XXX - Branch"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div key={index + " balance"} className="mb-4">
            <label htmlFor="balance" className="mb-2 block text-sm font-medium">
              Balance
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  disabled
                  type="number"
                  defaultValue={account.Balance}
                  placeholder={"XXX"}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>

        {!isEditing && (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}

        {isEditing && <Button type="submit">Save Edits</Button>}
      </div>
    </form>
  );
}

export function CreateAccountForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [accountType, setAccountType] = useState(''); // State for account type
  const [planType, setPlanType] = useState(''); // State for plan type

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
    },
    {
      Title: "Branch",
      Type: "string",
      ID: "Branch",
      Placeholder: "Enter Branch ID",
      canEdit: true,
    }
  ];

  // Handle account type change
  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountType(event.target.value);
    setPlanType(''); // Reset plan type when account type changes
  };

  // Handle plan type change
  const handlePlanTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanType(event.target.value);
  };

  return (
    <form
  onSubmit={async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get references to the input elements
    const customerIdElement = document.getElementById('customer_id') as HTMLInputElement | null;
    const balanceElement = document.getElementById('balance') as HTMLInputElement | null;
    const branchElement = document.getElementById('branch') as HTMLInputElement | null;

    // Check if elements are not null and have values
    const customer_id = customerIdElement ? customerIdElement.value : '';
    const balance = balanceElement ? balanceElement.value : '';
    const branch = branchElement ? branchElement.value : '';

    // Validate that none of these fields are empty
    if (!customer_id || !balance || !branch) {
      // Handle the error: show a message, log, etc.
      alert('Please fill in all required fields.');
      return; // Prevent submission
    }

    const formData = {
      customer_id,
      balance,
      branch,
      account_type: accountType,
      plan_type: accountType === 'saving' ? planType : undefined, // Include plan type only if saving
    };// Call your update function
    window.location.reload();
  }}
>

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Fields */}
        {fields.map((field) => (
          <div key={field.ID} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {field.Title}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
              {field.Type === "radio" ? (
                  <>
                    <label style={{ marginLeft: '20px', marginRight: '20px' }}>
                      <input
                        type="radio"
                        name="account_type"
                        value="current"
                        checked={accountType === 'current'}
                        onChange={handleAccountTypeChange}
                      />
                      Current
                    </label>
                    <label style={{ marginRight: '20px' }}>
                      <input
                        type="radio"
                        name="account_type"
                        value="saving"
                        checked={accountType === 'saving'}
                        onChange={handleAccountTypeChange}
                      />
                      Saving
                    </label>

                    {accountType === 'saving' && (
                        <select value={planType} onChange={(e) => setPlanType(e.target.value)}>
                          <option value="">Select Plan Type</option>
                          <option value="Children">Children</option>
                          <option value="Teen">Teen</option>
                          <option value="Adult">Adult</option>
                          <option value="Senior">Senior</option>
                        </select>
                    )}
                  </>
                ) : (
                  <input
                    id={field.ID}
                    name={field.ID}
                    type={field.Type}
                    placeholder={field.Placeholder}
                    className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                      !isEditing || !field.canEdit
                        ? "bg-gray-100 border-gray-200"
                        : "border-gray-300"
                    }`}
                  />
                )}

                {field.ID === "total_balance" && (
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                )}
              </div>
            </div>
          </div>
        ))}
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