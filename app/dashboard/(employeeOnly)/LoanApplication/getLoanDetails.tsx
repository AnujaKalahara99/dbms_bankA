"use client";
import { newManualLoan } from "@/app/lib/actions";
import { useState } from "react";

export default function getLoanDetails({customers , employee_id} : {customers : any[] , employee_id : string}) {
    const [customer_id , setCustomer_id] = useState("sdsa");
    const [data, setData] = useState([{Account_ID : "Please Select Customer"}]);    
    const [accounts , setAccounts] = useState();

    const callServiceFunction = async (customer_ID : string) => {
        
        try{
            const response = await fetch(`/api/fetchCustomerAccounts?customer_ID=${customer_ID}`);
            //console.log('Response:', response);
            const newData = await response.json();
            setData(newData);
            //console.log(customer_ID);
            console.log(newData[0].Account_ID);

        }catch(error){
            setData([{Account_ID : "Please Select Customer"}]);
        }
    };
    
    return (
        <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="customer-id" className="block text-gray-700 text-sm font-bold mb-2">Customer ID</label>
                <select id="customer-id" onChange={(e) => {
                setCustomer_id(e.target.value);
                callServiceFunction(e.target.value);
                }} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Please Select Customer</option>
                {customers.map((customer) => (
                    <option key={customer.Customer_ID} value={customer.Customer_ID}>{customer.Customer_ID}</option>
                ))}
                </select>
            </div>
            {/* <h1 className="text-lg font-bold text-gray-900 mb-4 text-center">{customer_id}</h1> */}
            <div className="mb-4">
                <label htmlFor="account-id" className="block text-gray-700 text-sm font-bold mb-2">Account ID</label>
                <select id="account-id" name="account-id" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {data.map((account) => (
                    <option key={account.Account_ID} value={account.Account_ID}>{account.Account_ID}</option>
                ))}
                </select>
            </div>
          
            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                <input id="amount" type="number" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="interest-rate" className="block text-gray-700 text-sm font-bold mb-2">Interest Rate</label>
                <input id="interest-rate" type="number" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
                <label htmlFor="employee-id" className="block text-gray-700 text-sm font-bold mb-2">Employee ID</label>
               <input id="employee-id" type="text" value={employee_id} readOnly className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Apply</button>
            </div>

        </div>
    );
}