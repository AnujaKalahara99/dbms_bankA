import { auth } from "@/auth";
import { notFound } from "next/navigation";
import TransactionForm from "./TransactionForm";
import { fetchAcountDetails, fetchAllBranches } from "@/app/lib/data";
//import { useState } from "react";


export default async function Page() {
    
    const session = await auth();
    const id = session?.user?.id;
    if (!id || !session?.user?.isCustomer) {
        notFound();
    }

    const branchesDetails = await fetchAllBranches();
    const allAccounts = await fetchAcountDetails(id);

    // const [inputValues , setInputValues] = useState('');

    return(
        <>
            <TransactionForm branchesDetails={branchesDetails} allAccounts={allAccounts}></TransactionForm>
        </>
    );
}