"use client";
import { Button } from "@/app/ui/button";
import { OnlineTransfer } from "@/app/lib/actions";
import { useState } from "react";

export default function TransactionForm({allAccounts , branchesDetails} : {allAccounts : any[] , branchesDetails : any[]}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
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
        setLoading(false);
        console.log(success);
    }
    if(loading){ 
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }else{ 
        return(
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* <h1>{JSON.stringify(allAccounts)}</h1> */}
                        <h1>{errorMessage}</h1>
                        <h1>Make a transaction</h1>
                        <div>
                            <label>
                                Recipient's Acount Number
                            </label>
                            <div className="relative">
                            <input  name="recipient_account" placeholder="       Enter Account Number"/>
                            </div>
                        </div>
                        <div>
                            <label>
                                Amount
                            </label>
                            <div className="relative">
                            <input name="amount" placeholder="       Enter Amount"/>
                            </div>
                        </div>
                        <div>
                            <label>
                                Description
                            </label>
                            <div className="relative">
                            <input name="description" placeholder="       Enter Description"/>
                            </div>
                        </div>
                        <div>
                            <label>
                                Branch ID
                            </label>
                            <div className="relative">
                                <select  name = "Branch">
                                {branchesDetails.map((branch, index) => (
                                    <option key={index} value={branch.Branch_ID}>
                                        {branch.Branch_ID}
                                    </option>
                                ))}
                                </select>
                                {/* <h1>{JSON.stringify(branchesDetails)}</h1> */}
                            </div>
                        </div>
                        <div>
                            <label>
                                Branch ID
                            </label>
                        <div className="relative">
                            {/* <h1>{JSON.stringify(allAccounts)}</h1>
                            <h1>{JSON.stringify(allAccounts)}</h1> */}
                            <select name="account">
                                {allAccounts.map((account, index) => (
                                    <option key={index} value={account.Account_ID}>
                                        {index + 1}. {account.Account_ID}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Log in
                        </Button>
                    </div>
                    {/* <h1>{JSON.stringify(inputValues)}</h1> */}
                </form>
            </>
        ); 
    }
    
}