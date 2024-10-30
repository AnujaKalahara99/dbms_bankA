import { auth } from "@/auth";
import { notFound } from "next/navigation";
import fetchAccountBalance from "@/app/lib/data";
import Link from "next/link";

export default async function Page() {
    
    const session = await auth();
    const id = session?.user?.id;
    if (!id || !session?.user?.isCustomer) {
        notFound();
    }

    const balanceDetails = await  fetchAccountBalance(id);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center bg-white p-4 rounded-lg bg-opacity-60">Thank you and come again</h1>
                <p className="text-3xl font-bold text-blue-700 mb-4 text-center bg-white p-4 rounded-lg bg-opacity-60">Your Balance is</p>
                <p className="text-3xl font-bold text-blue-700 mb-4 text-center bg-white p-4 rounded-lg bg-opacity-60">{Number(balanceDetails[0].Balance).toFixed(2)}</p>
                <Link href="/dashboard/atm" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">Go Back</Link>
            </div>
        </>
    );
}

