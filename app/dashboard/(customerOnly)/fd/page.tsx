import { fetchFDList } from "@/app/lib/data";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function FDPage() {
  const session = await auth();
  const id = session?.user?.id;
  
  if (!id || !session?.user?.isCustomer) {
    notFound();
  }

  const fdList = await fetchFDList(id);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Fixed Deposit Overview</h1>
      <Link href="/dashboard/fd/newFD">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Create New FD
        </button>
      </Link>
      
      {fdList?.length > 0 ? (
        fdList.map((fd) => (
          <div key={fd.FD_ID} className="bg-gray-100 p-4 rounded-lg mt-4">
            <p>FD ID: {fd.FD_ID}</p>
            <p>Account ID: {fd.Account_ID}</p>
            <p>Amount: {fd.Amount}</p>
            <p>Start Date: {fd.Start_Date.toISOString()}</p>
            <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2">Edit</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded mt-2">Close FD</button>
          </div>
        ))
      ) : (
        <p>No Fixed Deposits available</p>
      )}
    </main>
  );
}