import { newManualLoan } from "@/app/lib/actions";

export default function getLoanDetails({customers} : {customers : any[]}) {
    newManualLoan(new FormData());
    
    return (
        <div>
            <label htmlFor="">Customer id</label>
            <select>
              {customers.map((customer) => (
                <option key={customer.Customer_ID}>{customer.Customer_ID}</option>
              ))}
            </select>
            
        </div>
    );
}