// pages/create-loan.tsx
"use client";
import { FD_view } from '@/app/lib/definitions';
import { useState, FormEvent } from 'react';
import { createLoan } from "@/app/lib/actions";

function generateLoanId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function CreateLoan({ fd }: { fd: FD_view[] }) {
  const [fixedDepositId, setFixedDepositId] = useState<string>('');
  const [accountId, setAccountId] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number >(0) ;
  const [duration, setDuration] = useState<number>(6); // Default to 6 months
  const [interestRate, setInterestRate] = useState<number>(0);

  const [selectedFD, setSelectedFD] = useState('');
  const handleSelectChange = (value: string) => {
    setSelectedFD(value); // Update the state with the selected value
    handleFDChange(value); // Pass the value to the parent function if needed
  };

  const handleFDChange = (value: string) => {
    const selectedFD = fd.find(item => `${item.FD_ID}  -  ${item.Account_ID}` === value);
    console.log(selectedFD);
    if (selectedFD) {
      setFixedDepositId(selectedFD.FD_ID);
      setAccountId(selectedFD.Account_ID);
    }
  };

  const handleLoanAmountChange = (value: string) => {
    if (value === '') {
      setLoanAmount(0); // Reset to 0 when input is empty
      return;
    }
  
    const selectedFD = fd.find(item => item.FD_ID === fixedDepositId);
    const maxLoanAmount = selectedFD ? selectedFD.Amount * 0.6 : 0; // 60% of FD amount
    const amount = parseFloat(value);
  
    if (!isNaN(amount) && amount <= maxLoanAmount) {
      setLoanAmount(amount); // Update state only if valid
    } else {
      alert(`Loan amount cannot exceed ${maxLoanAmount}`);
    }
  };
  

 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const Loan_ID = generateLoanId();
    const loanData = {
      Loan_ID,
      Amount: loanAmount,
      Interest_Rate: interestRate,
      Duration_in_Months: duration,
      Account_ID: accountId!,
      Fixed_Deposit_ID: fixedDepositId,
    };

    // Replace this with actual backend logic if needed
    await createLoan(loanData);
    alert(' Loan successfully created! ');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Create Loan</h2>

        {/* Fixed Deposit Dropdown */}
    
      <label className="block text-gray-700 font-medium mb-2">Fixed Deposit</label>
      <select
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        onChange={(e) => handleSelectChange(e.target.value)} // Use handler to update the state
        value={selectedFD} // Bind the local state to the select value
      >
        <option value="">Select Fixed Deposit</option>
        {fd.map((item) => (
          <option key={item.FD_ID} value={`${item.FD_ID}  -  ${item.Account_ID}`}>
            FD_ID : {item.FD_ID}  | Acc_ID : {item.Account_ID}
          </option>
          
        ))}
      </select>
    

        {/* Loan Amount Input */}
        <label className="block text-gray-700 font-medium mb-2">Loan Amount</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onChange={(e) => handleLoanAmountChange(e.target.value)}
          value={loanAmount || ''}
        />

        {/* Duration Buttons */}
        <label className="block text-gray-700 font-medium mb-2">Duration</label>
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-white ${duration === 6 ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setInterestRate(12)}
          >
            6 Months
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-white ${duration === 12 ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setInterestRate(10)}
          >
            12 Months
          </button>
        </div>

        {/* Interest Rate Display */}
        <label className="block text-gray-700 font-medium mb-2">Interest Rate</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          value={`Interest: ${interestRate}`}
          readOnly
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}
