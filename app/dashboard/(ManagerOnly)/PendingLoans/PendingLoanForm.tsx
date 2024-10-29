"use client";

import {
    ArrowRightIcon,
  } from "@heroicons/react/24/outline";
import { useState } from "react";
import PendingLoanProfile from "./pendingLoanProfile";


export default function pendingLoanForm({ pendingLoans }: { pendingLoans: any[] }) {
    const [goToProfile, setGoToProfile] = useState(false);
    const [index, setIndex] = useState(0);
    function handleGoProfile(index_num: number) {
        setIndex(index_num);
        setGoToProfile(true);
    }
    if (goToProfile) {
        return (
            <div>
                <PendingLoanProfile PlayerProfile={pendingLoans[index]}></PendingLoanProfile>
            </div>
        );
    }else{
            return (
            <>
                <div className="p-6 bg-gray-100 bg-opacity-50 rounded-lg w-full h-full">
                        <table className="min-w-full bg-transparent">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left font-bold">Loan ID</th>
                                    <th className="py-2 px-4 border-b text-left font-bold">Employee ID</th>
                                    <th className="py-2 px-4 border-b text-left font-bold">Account ID</th>
                                    <th className="py-2 px-4 border-b text-left font-bold">Amount</th>
                                    <th className="py-2 px-4 border-b text-left font-bold">Interest Rate</th>
                                    <th className="py-2 px-4 border-b text-left font-bold">Duration in Month</th>
                                    <th className="py-2 px-4 border-b text-left font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingLoans.map((pendingLoan) => (
                                    <tr key={pendingLoan.Loan_ID}>
                                        <td className="py-2 px-4 border-b text-left">{pendingLoan.Loan_ID}</td>
                                        <td className="py-2 px-4 border-b text-left">{pendingLoan.Employee_ID}</td>
                                        <td className="py-2 px-4 border-b text-left">{pendingLoan.Account_ID}</td>
                                        <td className="py-2 px-4 border-b text-left">{pendingLoan.Amount}</td>
                                        <td className="py-2 px-4 border-b text-left">{Number(pendingLoan.Interest_Rate).toFixed(2)}</td>
                                        <td className="py-2 px-4 border-b text-left">{pendingLoan.Duration_in_Months}</td>
                                        <td className="py-2 px-4 border-b text-left">
                                            <div className="flex space-x-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => handleGoProfile(pendingLoans.indexOf(pendingLoan))} 
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    <ArrowRightIcon className="w-5"></ArrowRightIcon>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </>
        );
    }
    
}