"use client";

export default function Page() {    
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Success</h1>
            <button 
                type="button" 
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => window.location.href = "/dashboard/PendingLoans"}
            >
                Back
            </button>
        </main>
    );
}