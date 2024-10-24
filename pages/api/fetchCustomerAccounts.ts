import { fetchCustomerAccounts } from "@/app/lib/data";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //console.log("sdasddsa");
    if(req.method === 'GET'){
        const{customer_ID} = req.query;
        console.log(customer_ID);
        try{
            const account = await fetchCustomerAccounts(customer_ID as string);
            //console.log(account);
            res.status(200).json(account);

        }catch(error){

        }
    }
    
}

