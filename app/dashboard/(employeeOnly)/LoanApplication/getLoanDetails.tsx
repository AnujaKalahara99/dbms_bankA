"use client";
import { newManualLoan } from "@/app/lib/actions";
import { FormEventHandler, useState } from "react";
import Image from 'next/image';
import successImage from './images/successful.png';

export default function getLoanDetails({customers , employee_id , interesetRates , minimumAmount} : {customers : any[] , employee_id : string , interesetRates : any , minimumAmount : number}) {
    const [data, setData] = useState([{Account_ID : "Please Select Customer"}]); 
    const [CustomerName , setCustomerName] = useState("Please Select Email"); 
    const [notfilled , setNotfilled] = useState(false);
    const [complete , setComplete] = useState(false);
    const [duration , setDuration] = useState(6);
    const [wrongAmount , setWrongAmount] = useState(false);

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

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const customerEmail = formData.get("customerEmail");
        const accountID = formData.get("accountID");
        const amount = formData.get("amount");
        const interest = formData.get("interestRate");
        const duration = formData.get("duration");

        if(customerEmail === "" || amount === "" || interest === "" || duration === "" || accountID === null ){
            setNotfilled(true);
            return;
        }
        setNotfilled(false);
        if(Number(amount) < minimumAmount){
            setWrongAmount(true);
            return;
        }
        setWrongAmount(false);
        
        newManualLoan(Number(amount) , Number(interest) , Number(duration) , employee_id , String(accountID)); 
        setComplete(true);
        
    }
    
    if(complete){
        return (
            <>
                <div >
                    <div className="flex flex-col items-center bg-white pt-6 pb-6 w-full max-w-md mx-auto rounded-lg">
                        <Image src={successImage} alt="Loan Application Success" width={200} height={200} className="rounded-full" />
                        <h1 className="text-green-800">Loan Application Created Successfully</h1>
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            go to Home
                        </button>
                    </div>
                </div>
            </>
        )
    }else{
        return (
        <div className="pt-4">
            <form onSubmit={handleSubmit}>
                    <div className="mb-4 bg-white rounded-lg opacity-85 p-6">
                    <label htmlFor="customer-id" className="block text-gray-700 text-sm font-bold mb-2">Customer Email</label>
                    <select name="customerEmail" id="customer-id" onChange={(e) => {
                        setCustomerName(e.target.value !== "" ? customers.find((customer) => customer.Customer_ID === e.target.value)?.Name : "Please Select Email");
                        callServiceFunction(e.target.value);
                    }} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Please Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer.Customer_ID} value={customer.Customer_ID}>{customer.Email}</option>
                    ))}
                    </select>
                </div>
                {/* <h1 className="text-lg font-bold text-gray-900 mb-4 text-center">{customer_id}</h1> */}
                <div className="mb-4 bg-white  rounded-lg opacity-85 p-6">
                    <label htmlFor="employee-id" className="block text-gray-700 text-sm font-bold mb-2">Customer Name</label>
                    <input name="customerName" id="employee-id" type="text" value={CustomerName} readOnly className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-4 bg-white  rounded-lg opacity-85 p-6">
                    <label htmlFor="accountID" className="block text-gray-700 text-sm font-bold mb-2">Account ID</label>
                    <select id="account-id" name="accountID" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    {data.map((account) => (
                        <option key={account.Account_ID} value={account.Account_ID}>{account.Account_ID}</option>
                    ))}
                    </select>
                </div>
            
                <div className="mb-4 bg-white  rounded-lg opacity-85 p-6">
                    <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                    <input name="amount" id="amount" type="number" className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <p className="text-red-500 mb-4">{wrongAmount ? "Minimum amount is 50000" : ""}</p>
                </div>
                <div className="mb-4 bg-white  rounded-lg opacity-85 p-6">
                    <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
                    <select name="duration" id="duration" onChange={(e) => setDuration(Number(e.target.value))} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option value={6}>6 Months</option>
                        <option value={12}>12 Months</option>
                        <option value={18}>18 Months</option>
                        <option value={24}>24 Months</option>
                    </select>
                </div>
                <div className="mb-4 bg-white  rounded-lg opacity-85 p-6">
                    <label htmlFor="interest-rate" className="block text-gray-700 text-sm font-bold mb-2">Interest Rate</label>
                    <input type="text" name="interestRate" value={interesetRates[duration]} readOnly className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div className="mb-4 bg-white  rounded-lg opacity-85 p-6">
                    <label htmlFor="employee-id" className="block text-gray-700 text-sm font-bold mb-2">Employee ID</label>
                    <input name="employeeID" id="employee-id" type="text" value={employee_id} readOnly className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <p className="text-red-500 mb-4">{notfilled ? "Please fill out all fields" : ""}</p>
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded">Apply</button>
                </div>
            </form>
        </div>
        );
    }
    
}