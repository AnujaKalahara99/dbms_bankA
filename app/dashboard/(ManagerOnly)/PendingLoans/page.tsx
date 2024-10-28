import { fetchPendingLoans } from "@/app/lib/data";
import PendingLoanForm from "./PendingLoanForm";
export default async function Page() {

    const pendingLoans = await fetchPendingLoans(); 

    return (
        <>
            <div>
                <PendingLoanForm pendingLoans={pendingLoans} />
            </div>
        </>
    );
}