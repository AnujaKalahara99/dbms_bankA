"use client";
import SuccessIMG from '../Success/successful.png'
import Image from 'next/image'

export default function Page() {    
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 bg-transparent">
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-lg" >
                <h1 className="text-2xl font-semibold text-blue-500">Successful</h1>
            <Image src={SuccessIMG} alt="Success Image" width={200} height={200} />
            <button 
                type="button" 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => window.location.href = "/dashboard/PendingLoans"}
            >
                Back
            </button>
            </div>
            
        </main>
    );
}