import { fetchAllCustomers, fetchCustomerFull } from "@/app/lib/data";
import GetLoanDetails from "./getLoanDetails";

export default async function Page() {

    const customers = await fetchAllCustomers();
    console.log(customers);
    return (
        <>
            <div>
                <p>Loan Application</p>
                <GetLoanDetails customers={customers} />

            </div>
        </>
    );
}