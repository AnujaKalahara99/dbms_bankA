import { fetchAcountDetails } from "@/app/lib/data";

export default async function Branch_Select({customer_id}:{customer_id : string}) {
    
    const allAccounts = await fetchAcountDetails(customer_id);

    return(
        <div className="relative">
            <h1>{JSON.stringify(allAccounts)}</h1>
            <select name="" id="">
            {allAccounts.map((account, index) => (
                <option key={index} value={account.Account_ID}>
                    {index + 1}. {account.Account_ID}
                </option>
            ))}
            </select>
        </div>
    );
}