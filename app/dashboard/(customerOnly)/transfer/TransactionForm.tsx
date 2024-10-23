"use client";
import { Button } from "@/app/ui/button";
import { OnlineTransfer } from "@/app/lib/actions";
import { useState } from "react";

export default function TransactionForm({allAccounts , branchesDetails} : {allAccounts : any[] , branchesDetails : any[]}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordCheck , setPasswordCheck] = useState(false);
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // prevent default form submission
        
        const formData = new FormData(event.currentTarget);
        // check if all inputs are entered
        if (
          formData.get("recipient_account") ==="" ||
          formData.get("amount") === ""||
          formData.get("description") ==="" ||
          formData.get("branch_id") ===""
        ) {
          setErrorMessage("Please fill in all fields");
          return;
        }
        setErrorMessage("");

        setLoading(true);
        var success = await OnlineTransfer(formData);
        if (success) {
          window.location.href = "./transfer/Success";
        } else {
          window.location.href = "./transfer/Failed";
        }
        console.log(success);
    }
    if(loading){ 
        return(
            <>
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="p-4 bg-white rounded-md shadow-md">
                    <h1 className="text-2xl font-semibold text-blue-500">Loading...</h1>
                    </div>
                </div>
            </>
        )
    }else{ 
        return(
            <>
                <div className="w-full rounded-md bg-gray-50 p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center">
                            {/* <h1>{JSON.stringify(allAccounts)}</h1> */}
                            {/* //Also algn this h1 in the middle */}
                            <h1 className="text-blue-500 text-2xl font-semibold mb-4 ">Make a transaction</h1>
                            <div>
                                <label className="mt-4 mb-2">
                                    Recipient's Acount Number
                                </label>
                                <div className="relative">
                                    <input className="border border-gray-300 rounded-md px-2 py-1" name="recipient_account" placeholder="Enter Account Number" />
                                </div>
                                </div>
                                <div>
                                <label className="mt-4 mb-2">
                                    Amount
                                </label>
                                <div className="relative">
                                    <input className="border border-gray-300 rounded-md px-2 py-1" name="amount" placeholder="Enter Amount" />
                                </div>
                                </div>
                                <div>
                                <label className="mt-4 mb-2">
                                    Description
                                </label>
                                <div className="relative">
                                    <input className="border border-gray-300 rounded-md px-2 py-1" name="description" placeholder="Enter Description" />
                                </div>
                                </div>
                                <div>
                                <label className="mt-4 mb-2">
                                    Branch ID
                                </label>
                                <div className="relative">
                                    <select className="border border-gray-300 rounded-md px-2 py-1 w-full pr-8 appearance-none" name="Branch">
                                    {branchesDetails.map((branch, index) => (
                                        <option key={index} value={branch.Branch_ID}>
                                        {branch.Branch_ID}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                </div>
                                <div>
                                <label className="mt-4 mb-2">
                                    Account
                                </label>
                                <div className="relative">
                                    <select className="border border-gray-300 rounded-md px-2 py-1 w-full pr-8 appearance-none" name="account">
                                    {allAccounts.map((account, index) => (
                                        <option key={index} value={account.Account_ID}>
                                        {index + 1}. {account.Account_ID}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            </div>
                            <p className="text-red-500 p-4">{errorMessage}</p>
                            <Button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white inline-block">
                                Confirm
                            </Button>
                        </div>
                        {/* <h1>{JSON.stringify(inputValues)}</h1> */}
                    </form>
                </div> 
            </>
        ); 
    }
    
}