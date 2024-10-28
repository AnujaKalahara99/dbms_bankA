import { acceptManualLoan } from "@/app/lib/actions";

export default function PendingLoanProfile(PendingLoanProfile: any) {
    const profile = PendingLoanProfile["PlayerProfile"];
    return (
        <>
            <form className="p-6 bg-gray-100 rounded-lg max-w-lg mx-auto">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="" className="block font-bold mb-1">Loan ID</label>
                        <input type="text" defaultValue={profile.Loan_ID} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <label htmlFor="" className="block font-bold mb-1">Employee ID</label>
                        <input type="text" defaultValue={profile.Employee_ID} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <label htmlFor="" className="block font-bold mb-1">Account ID</label>
                        <input type="text" defaultValue={profile.Account_ID} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <label htmlFor="" className="block font-bold mb-1">Amount</label>
                        <input type="text" defaultValue={profile.Amount} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <label htmlFor="" className="block font-bold mb-1">Interest Rate</label>
                        <input type="text" defaultValue={profile.Interest_Rate} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <label htmlFor="" className="block font-bold mb-1">Duration in Months</label>
                        <input type="text" defaultValue={profile.Duration_in_Months} readOnly className="w-full p-2 border border-gray-300 rounded-md bg-gray-50" />
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            type="button" 
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => 
                                {
                                    acceptManualLoan(profile.Loan_ID, "Accept")
                                    window.location.href = "/dashboard/Success"
                                }
                            }
                        >
                            Confirm
                        </button>
                        <button 
                            type="button" 
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                acceptManualLoan(profile.Loan_ID, "Reject")
                                window.location.href = "/dashboard/Success"
                            }}
                        >
                            Reject
                        </button>
                        <button 
                            type="button" 
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => window.location.href = "/dashboard/PendingLoans"}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}