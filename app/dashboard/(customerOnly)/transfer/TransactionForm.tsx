"use client";
import { Button } from "@/app/ui/button";
import { OnlineTransfer } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import Success from "./Success/page";
import EnterPassword from "./EnterPassword";
import { set } from "zod";
import { checkPassword } from "@/app/lib/actions";

export default function TransactionForm({customer_id , allAccounts , branchesDetails} : {customer_id : string , allAccounts : any[] , branchesDetails : any[]}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showEnterPassword, setShowEnterPassword] = useState(false);
    const [newformData , setnewformData] = useState(new FormData());
    const [password , setPassword] = useState("");
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // prevent default form submission
        // check if all inputs are entered

        const formData = new FormData(event.currentTarget);

        if (
          formData.get("recipient_account") ==="" ||
          formData.get("amount") === ""||
          formData.get("description") ==="" ||
          formData.get("branch_id") ===""
        ) {
          setErrorMessage("Please fill in all fields");
          return;
        }
        setnewformData(formData);
        setErrorMessage("");
        //console.log(formData);
        setShowEnterPassword(true);
        

        // setLoading(true);
        // var success = await OnlineTransfer(formData);
        // if (success) {
        //   window.location.href = "./transfer/Success";
        // } else {
        //   window.location.href = "./transfer/Failed";
        // }
        // console.log(success);
        
    }
    
    async function handleSubmitPassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); 
        //console.log(password);
        // const formData = new FormData(event.currentTarget);
        // const password = String(formData.get("password"));
        //const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
        if(password === ""){
            setErrorMessage("Please enter password");
            return;
        }
        setErrorMessage("");
        const passwordsMatch = await checkPassword(customer_id , password );
        console.log(passwordsMatch);

        if(passwordsMatch){
            setLoading(true);
            const success = await OnlineTransfer(newformData);
            if (success) {
            window.location.href = "./transfer/Success";
            } else {
            window.location.href = "./transfer/Failed";
            }
            console.log(success);
        }else{ 
            setErrorMessage("Incorrect password");
        }
        
    }
    if(showEnterPassword && newformData){
        return(
            <>
                <form onSubmit={handleSubmitPassword} className="max-w-sm mx-auto p-4 bg-white rounded shadow-md">
                  <h1 className="text-2xl font-bold text-blue-500 mb-6">Enter Password</h1>
                  <input 
                    type="password" 
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Confirm
                  </button>
                </form>
            </>
        )
    }

    // if(loading){ 
    //     return(
    //         <>
    //             <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
    //                 <div className="p-4 bg-white rounded-md shadow-md">
    //                 <h1 className="text-2xl font-semibold text-blue-500">Loading...</h1>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }else{ 
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
                                Branch
                            </label>
                            <div className="relative">
                                <select className="border border-gray-300 rounded-md px-2 py-1 w-full pr-8 appearance-none" name="Branch">
                                {branchesDetails.map((branch, index) => (
                                    <option key={index} value={branch.Branch_ID}>
                                    {branch.Name}
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