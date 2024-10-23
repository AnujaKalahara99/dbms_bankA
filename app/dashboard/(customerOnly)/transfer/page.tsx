
import { Button } from "@/app/ui/button";
import Branch_Select from "./Branch_Select"
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Account_Select from "./Account_Select";
//import { useState } from "react";


export default async function Page() {
    
    const session = await auth();
    const id = session?.user?.id;
    if (!id || !session?.user?.isCustomer) {
        notFound();
    }

    // const [inputValues , setInputValues] = useState('');

    return(
        <>
            <div>
                <h1>{JSON.stringify(id)}</h1>
                <h1>Make a transaction {id }</h1>
                <div>
                    <label>
                        Recipient's Acount Number
                    </label>
                    <div className="relative">
                    <input  placeholder="       Enter Account Number"/>
                    </div>
                </div>
                <div>
                    <label>
                        Amount
                    </label>
                    <div className="relative">
                    <input placeholder="       Enter Amount"/>
                    </div>
                </div>
                <div>
                    <label>
                        Description
                    </label>
                    <div className="relative">
                    <input placeholder="       Enter Description"/>
                    </div>
                </div>
                <div>
                    <label>
                        Branch ID
                    </label>
                    <div className="relative">
                        <Branch_Select>
                        </Branch_Select>
                    </div>
                </div>
                <div>
                    <label>
                        Branch ID
                    </label>
                    <div className="relative">
                        <Account_Select customer_id = {id}></Account_Select>
                    </div>
                </div>
                <Button >
                    Log in
                </Button>
            </div>
            {/* <h1>{JSON.stringify(inputValues)}</h1> */}
        </>
    );
}