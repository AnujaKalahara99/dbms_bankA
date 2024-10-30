"use client";
import { Deposite, Withdraw } from "@/app/lib/actions";
import Link from "next/link";
import { useState } from "react";
import { set } from "zod";
import twentyfive from "@/app/dashboard/(customerOnly)/atm/MoneyNotes/25.jpg";
import fifty from "@/app/dashboard/(customerOnly)/atm/MoneyNotes/50.jpg";
import onehundred from "@/app/dashboard/(customerOnly)/atm/MoneyNotes/100.jpg";
import fivehundred from "@/app/dashboard/(customerOnly)/atm/MoneyNotes/500.jpg";

export default function Menu({balanceDetails} : {balanceDetails : any[]}){
    

    const [deposite , setDeposite] = useState(false);
    const [withdraw , setWithdraw] = useState(false);
    const [amount , setAmount] = useState(0);
    const [invalidAmount , setInvalidAmount] = useState(false);
    const [balance , setBalance] = useState(-1);
    const [Account_ID , setAccount_ID] = useState("");
    const [Account_Type , setAccount_Type] = useState("");
    const [remainingWithdrawals , setRemainingWithdrawals] = useState(0);
    const [withdrawalAmount , setWithdrawalAmount] = useState(0);

    async function handleDeposite(){
        if(amount === 0){
            setInvalidAmount(true);
            return;
        }
        setInvalidAmount(false);
        //Try catch ekk gahanna thynwa
        console.log(Account_ID);
        await Deposite(Account_ID , balance , amount);
        window.location.href = "/dashboard/atm/Successfull";

    }

    async function handleWithdraw(){
        console.log("wsdwasfdwd");
        if(withdrawalAmount === 0){
            setInvalidAmount(true);
            return;
        }
        if(withdrawalAmount > balance){
            setInvalidAmount(true);
            return;
        }
        setInvalidAmount(false);
        //Try catch ekk gahanna thynwa
        console.log(Account_ID);
        const message = await Withdraw(Account_ID , balance , withdrawalAmount);
        if(message === ""){
            window.location.href = "/dashboard/atm/Successfull";
        }else if(message === "Withdrawal limit exceeded"){
            window.location.href = "/dashboard/atm/LimitExceeded";
        }else{
            window.location.href = "/dashboard/atm/Failed";
        }
    }

    if(deposite){
        return(
            <>
                <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Deposite</h1>
                <div className="flex flex-col items-center">
                    <label className="text-xl mb-2">Insert Amount</label>
                    <input 
                        type="number" 
                        value={amount} 
                        min={0} 
                        readOnly 
                        className="border p-2 rounded mb-4 text-center"
                    />
                    <p className="text-red-500 mb-4">{invalidAmount ? "Invalid Amount" : ""}</p>
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                    <button className="p-2 border rounded"><img src={twentyfive.src} alt="25" className="w-25 h-16" onClick={() => setAmount(amount + 25)}/></button>
                    <button className="p-2 border rounded"><img src={fifty.src} alt="50" className="w-25 h-16"  onClick={() => setAmount(amount + 50)} /></button>
                    <button className="p-2 border rounded"><img src={onehundred.src} alt="100" className="w-25 h-16" onClick={() => setAmount(amount + 100)}/></button>
                    <button className="p-2 border rounded"><img src={fivehundred.src} alt="500" className="w-25 h-16" onClick={() => setAmount(amount + 500)}/></button>
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                    <button 
                        className="bg-blue-500 p-4 text-2xl text-white font-bold rounded-lg" 
                        onClick={() => {
                            setDeposite(false);
                            setInvalidAmount(false);
                            setBalance(-1);
                        }}
                    >
                        Back
                    </button>
                    <button 
                        className="bg-green-500 p-4 text-2xl text-white font-bold rounded-lg" 
                        onClick={() => {
                            handleDeposite();

                        }}
                    >
                        Confirm
                    </button>
                </div>
            </>
        );  
    }else if(withdraw){
        return(
            <>
                <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Withdraw</h1>
                <div className="flex flex-col items-center">
                    <label className="text-xl mb-2">Amount</label>
                    <input 
                        type="number" 
                        onChange={(e) => setWithdrawalAmount(Number(e.target.value))} 
                        className="border p-2 rounded mb-4 text-center"
                    />
                    <p className="text-red-500 mb-4">{invalidAmount ? "Invalid Amount" : ""}</p>
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                    <button 
                        className="bg-green-500 p-4 text-2xl text-white font-bold rounded-lg" 
                        onClick={handleWithdraw}
                    >
                        Confirm
                    </button>
                    <button 
                        className="bg-blue-500 p-4 text-2xl text-white font-bold rounded-lg" 
                        onClick={() => {
                            setWithdraw(false);
                            setInvalidAmount(false);
                            setBalance(-1);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </>
        );
    }


    return(
        <>
            <div className="bg-white h-600 w-full flex flex-col items-center justify-center p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Choose Your Options</h2>
                <select 
                    className="border p-2 rounded mb-4 w-full max-w-xs"
                    name="" 
                    id="" 
                    onChange={(e) => {
                        const arr = e.target.value.split(",");
                        setBalance(Number(arr[0]));
                        console.log(arr[1]);
                        setAccount_Type(arr[1]);
                        setRemainingWithdrawals(Number(arr[2]));
                        setAccount_ID(arr[3]);
                    }}
                >
                    <option key="0" value={["-1" , "0" , "0" , "0"]}>Select an account</option>
                    {balanceDetails.map((balanceDetail) => {
                        return (
                            <option key={balanceDetail.account_ID} value={[balanceDetail.Balance , balanceDetail.Account_Type , balanceDetail.Remaining_Withdrawals ,balanceDetail.account_ID ]}>{balanceDetail.account_ID}</option>
                        );
                    })}
                </select>
                <div className="bg-blue-500 p-4 text-2xl text-white font-bold rounded-lg absolute top-0 right-0 m-14">
                    <p>Balance = {balance === -1 ? "N/A" : "$"+balance}</p>
                </div>
                <button 
                    className="bg-blue-500 p-4 text-2xl text-white font-bold rounded-lg mt-4 hover:bg-blue-600 transition duration-300" 
                    onClick={() => setDeposite(true)}
                >
                    Deposite
                </button>
                <button 
                    className="bg-blue-500 p-4 text-2xl text-white font-bold rounded-lg mt-4 hover:bg-blue-600 transition duration-300" 
                    onClick={() => setWithdraw(true)}
                >
                    Withdraw
                </button>
            </div>
            
        </>
    );
}