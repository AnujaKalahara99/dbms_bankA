"use client";
import { newManualLoan } from "@/app/lib/actions";
import { FormEventHandler, useState } from "react";
import Image from "next/image";
import successImage from "./images/successful.png";
import {
  CurrencyDollarIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";

export default function getLoanDetails({
  customers,
  employee_id,
  interesetRates,
  minimumAmount,
}: {
  customers: any[];
  employee_id: string;
  interesetRates: any;
  minimumAmount: number;
}) {
  const [data, setData] = useState([{ Account_ID: "Please Select Customer" }]);
  const [CustomerName, setCustomerName] = useState("Please Select Email");
  const [notfilled, setNotfilled] = useState(false);
  const [complete, setComplete] = useState(false);
  const [duration, setDuration] = useState(6);
  const [wrongAmount, setWrongAmount] = useState(false);

  const callServiceFunction = async (customer_ID: string) => {
    try {
      const response = await fetch(
        `/api/fetchCustomerAccounts?customer_ID=${customer_ID}`
      );
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      setData([{ Account_ID: "Please Select Customer" }]);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerEmail = formData.get("customerEmail");
    const accountID = formData.get("accountID");
    const amount = formData.get("amount");
    const interest = formData.get("interestRate");
    const duration = formData.get("duration");

    if (
      customerEmail === "" ||
      amount === "" ||
      interest === "" ||
      duration === "" ||
      accountID === null
    ) {
      setNotfilled(true);
      return;
    }
    setNotfilled(false);
    if (Number(amount) < minimumAmount) {
      setWrongAmount(true);
      return;
    }
    setWrongAmount(false);

    newManualLoan(
      Number(amount),
      Number(interest),
      Number(duration),
      employee_id,
      String(accountID)
    );
    setComplete(true);
  };

  if (complete) {
    return (
      <div className="flex flex-col items-center bg-white pt-6 pb-6 w-full max-w-md mx-auto rounded-lg">
        <Image
          src={successImage}
          alt="Loan Application Success"
          width={200}
          height={200}
          className="rounded-full"
        />
        <h1 className="text-green-800">
          Loan Application Created Successfully
        </h1>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </button>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="rounded-md bg-gray-50 p-4 md:p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="customer-id"
            className="block text-sm font-medium mb-2"
          >
            Customer Email
          </label>
          <select
            name="customerEmail"
            id="customer-id"
            onChange={(e) => {
              setCustomerName(
                e.target.value !== ""
                  ? customers.find(
                      (customer) => customer.Customer_ID === e.target.value
                    )?.Name
                  : "Please Select Email"
              );
              callServiceFunction(e.target.value);
            }}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Please Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.Customer_ID} value={customer.Customer_ID}>
                {customer.Email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Customer Name
          </label>
          <input
            name="customerName"
            type="text"
            value={CustomerName}
            readOnly
            className="block w-full rounded-md border-gray-300 py-2 pl-3 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Account ID</label>
          <select
            name="accountID"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {data.map((account) => (
              <option key={account.Account_ID} value={account.Account_ID}>
                {account.Account_ID}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Enter amount"
            className="block w-full rounded-md border-gray-300 py-2 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <CurrencyDollarIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          {wrongAmount && (
            <p className="text-red-500 mt-1">
              Minimum amount is {minimumAmount}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Duration</label>
          <select
            name="duration"
            onChange={(e) => setDuration(Number(e.target.value))}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={6}>6 Months</option>
            <option value={12}>12 Months</option>
            <option value={18}>18 Months</option>
            <option value={24}>24 Months</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Interest Rate
          </label>
          <input
            type="text"
            name="interestRate"
            value={interesetRates[duration]}
            readOnly
            className="block w-full rounded-md border-gray-300 py-2 pl-3 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Employee ID</label>
          <input
            name="employeeID"
            type="text"
            value={employee_id}
            readOnly
            className="block w-full rounded-md border-gray-300 py-2 pl-3 bg-gray-100"
          />
        </div>

        {notfilled && (
          <p className="text-red-500 mb-4">Please fill out all fields</p>
        )}

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Apply
        </Button>
      </form>
    );
  }
}
