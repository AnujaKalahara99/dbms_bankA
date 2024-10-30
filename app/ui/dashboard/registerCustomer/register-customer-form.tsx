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
import { createAccount, registerCustomer } from "@/app/lib/actions";

export function RegisterCustomerForm() {
  const [customerType, setCustomerType] = useState("");
  const [dateInfo, setDateInfo] = useState("");
  const [identityNum, setIdentityNum] = useState(""); // State for account type
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [phoneNumber, setPhoneNumber] = useState("");

  const fields = [
    {
      Title: "Name",
      Type: "string",
      ID: "name",
      Placeholder: "Enter Name",
    },
    {
      Title: "Address_Line_1",
      Type: "string",
      ID: "address_line_1",
      Placeholder: "Enter Address Line 1",
      canEdit: true,
    },
    {
      Title: "Address_Line_2",
      Type: "string",
      ID: "address_line_2",
      Placeholder: "Enter Address Line 2",
      canEdit: true,
    },
    {
      Title: "City",
      Type: "string",
      ID: "city",
      Placeholder: "Enter City",
      canEdit: true,
    },
    {
      Title: "Phone Number",
      Type: "string",
      ID: "phone_number",
      Placeholder: "Enter Phone Number",
      canEdit: true,
    },
    {
      Title: "Email",
      Type: "email",
      ID: "email",
      Placeholder: "Enter Email",
      canEdit: true,
    },
  ];

  const handleCustomerTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value !== undefined) {
      setCustomerType(value); // Update selected customer type
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message

    if (!customerType) {
      setError("Please select a customer type.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    // Call registerCustomer and handle response
    const response = await registerCustomer(formData);
    if (response.success) {
      setSuccess("Customer Regsitered successfully!"); // Set success message
      window.location.reload(); // Optionally reload the page
    } else {
      setError(response.message || "An unknown error occurred."); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Error message display */}
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Fields */}
        {fields.map((field) => (
          <div key={field.ID} className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              {field.Title}
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                {field.ID === "phone_number" ? (
                  <>
                    <input
                      id={field.ID}
                      name={field.ID}
                      type="string" // Use "tel" for phone numbers
                      placeholder={field.Placeholder}
                      className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 border-gray-300"
                      required={[
                        "name",
                        "address_line_1",
                        "city",
                        "phone_number",
                        "email",
                        "password",
                      ].includes(field.ID)}
                      onChange={handlePhoneChange}
                    />
                    {phoneNumber && phoneNumber.length !== 15 && (
                      <p className="text-red-500 text-xs mt-1">
                        Phone number must be exactly 10 digits.
                      </p>
                    )}
                  </>
                ) : (
                  <input
                    id={field.ID}
                    name={field.ID}
                    type="string"
                    placeholder={field.Placeholder}
                    className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 border-gray-300"
                    required={[
                      "name",
                      "address_line_1",
                      "city",
                      "phone_number",
                      "email",
                      "password",
                    ].includes(field.ID)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <div key={"customer_type"} className="mb-4">
          <label
            htmlFor="customer_type"
            className="mb-2 block text-sm font-medium"
          >
            {"Customer Type"}
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <label style={{ marginLeft: "20px", marginRight: "20px" }}>
                <input
                  className="mr-2"
                  type="radio"
                  name="customer_type"
                  value="Personal"
                  checked={customerType === "Personal"}
                  onChange={handleCustomerTypeChange}
                />
                Personal
              </label>
              <label style={{ marginRight: "20px" }}>
                <input
                  className="mr-2"
                  type="radio"
                  name="customer_type"
                  value="Organization"
                  checked={customerType === "Organization"}
                  onChange={handleCustomerTypeChange}
                />
                Organization
              </label>
            </div>
          </div>

          {/* Conditional fields based on customer type */}
          {customerType === "Personal" && (
            <div className="mb-4">
              <label
                htmlFor="plan_type"
                className="mb-2 block text-sm font-medium"
              >
                Date of birth
              </label>
              <input
                id="dob"
                name="date_info"
                type="date"
                value={dateInfo}
                required
                title="Date of Birth"
                placeholder="Enter Date of Birth"
                onChange={(event) => setDateInfo(event.target.value)}
                className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <label
                htmlFor="plan_type"
                className="mb-2 block text-sm font-medium"
              >
                NIC
              </label>
              <input
                id="nic"
                name="identity_num"
                type="string"
                value={identityNum}
                title="ID Number"
                required
                onChange={(event) => setIdentityNum(event.target.value)}
                className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {identityNum && identityNum.length !== 10 && (
                <p className="text-red-500 text-xs mt-1">
                  NIC must be exactly 10 characters.
                </p>
              )}
            </div>
          )}

          {customerType === "Organization" && (
            <div className="mb-4">
              <label
                htmlFor="plan_type"
                className="mb-2 block text-sm font-medium"
              >
                Registration Date
              </label>
              <input
                id="registration_date"
                name="date_info"
                type="date"
                title="Registration Date"
                value={dateInfo}
                required
                onChange={(event) => setDateInfo(event.target.value)}
                className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <label
                htmlFor="plan_type"
                className="mb-2 block text-sm font-medium"
              >
                Business Registration Number
              </label>
              <input
                id="brn"
                name="identity_num"
                title="Business Registration Number"
                type="string"
                value={identityNum}
                required
                onChange={(event) => setIdentityNum(event.target.value)}
                className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              {identityNum && identityNum.length !== 10 && (
                <p className="text-red-500 text-xs mt-1">
                  Registration Number must be exactly 10 characters.
                </p>
              )}
            </div>
          )}
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

        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}
