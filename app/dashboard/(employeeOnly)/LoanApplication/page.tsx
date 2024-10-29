
import { fetchAllCustomers, fetchCustomerFull } from "@/app/lib/data";
import GetLoanDetails from "./getLoanDetails";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    console.log(id);
    const customers = await fetchAllCustomers();

    //Loan constraints
    const interesetRates = {6 : 10 , 12 : 10 , 18 : 5 , 24 : 5}
    const minimumAmount = 50000;

    return (
        <>
            <div className="w-full mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Loan Application</h1>
              <GetLoanDetails customers={customers}  employee_id={id as string} interesetRates={interesetRates} minimumAmount={minimumAmount}/>
            </div>
        </>
    );
}