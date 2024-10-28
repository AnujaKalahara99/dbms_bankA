

import { fetchFDList } from "@/app/lib/data";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

export default async function FDPage() {
  const session = await auth();
  const id = session?.user?.id;
  
  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  const fdList = await fetchFDList(id);

  return (
    <main className="container mx-auto p-6">
      <h1 className={`${lusitana.className} text-2xl mb-6 font-bold`}>Fixed Deposit Overview</h1>
      
      <Link href="/dashboard/fd/newFD">
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out">
          Create New FD
        </button>
      </Link>
      
      {fdList?.length > 0 ? (
        <div className="mt-6 space-y-4">
          {fdList.map((fd) => (
            <div key={fd.FD_ID} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold">FD ID: {fd.FD_ID}</p>
              <p>Account ID: {fd.Account_ID}</p>
              <p>Amount: {fd.Amount}</p>
              <p>Start Date: {fd.Start_Date.toISOString()}</p>
              <div className="mt-4 flex gap-4">
                {/* <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200 ease-in-out">
                  Edit
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200 ease-in-out">
                  Close FD
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No Fixed Deposits available</p>
      )}
    </main>
  );
}
