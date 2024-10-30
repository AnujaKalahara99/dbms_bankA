import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Menu from "./components/Menu";
import fetchAccountBalance from "@/app/lib/data";

export default async function Page() {
    
    const session = await auth();
    const id = session?.user?.id;
    if (!id || !session?.user?.isCustomer) {
        notFound();
    }

    const balanceDetails = await  fetchAccountBalance(id);
    const balance = 25000;
    const limit = 5 ;

    return (
        <div>
            {/* <h1>{JSON.stringify(balanceDetails)}</h1> */}
            <Menu balanceDetails = {balanceDetails}></Menu>
        </div>
    );
}