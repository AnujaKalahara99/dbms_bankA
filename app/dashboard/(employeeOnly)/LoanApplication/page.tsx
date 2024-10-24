
import { fetchAllCustomers, fetchCustomerFull } from "@/app/lib/data";
import GetLoanDetails from "./getLoanDetails";
import { auth } from "@/auth";

export default async function Page() {
    const session = await auth();
    const id = session?.user?.id;
    console.log(id);
    // if (!id || !session?.user?.isCustomer) {
    //     notFound();
    // }
    const customers = await fetchAllCustomers();
    //console.log(customers);
    return (
        <>
            <div className="w-full mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Loan Application</h1>
              <GetLoanDetails customers={customers}  employee_id={id as string}/>
            </div>
        </>
    );
}