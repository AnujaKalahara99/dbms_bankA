
// import { notFound } from "next/navigation";
import { lusitana } from "@/app/ui/fonts";

import Loan from "@/app/ui/dashboard/customers/loan/onlineLoanCreate";
import { auth } from "@/auth";
import { getFD } from "@/app/lib/data";
import { FD_view } from '@/app/lib/definitions';

export default async function createLoan() {

  let fd: FD_view[] = [];
  try {
    const session = await auth();
    if (!session?.user?.id) {
      
      return <p className="text-center mt-10">You need to log in to create your loans.</p>;
    }
    const id = session.user.id;

    fd = await getFD(id);
  }  catch (error) {
    console.error('Error fetching loans:', error);
    return <p className="text-center mt-10">Failed to fetch Fixed_Deposit. Please try again later.</p>;
  }

  if (!fd.length) {
    return <p className="text-center mt-10">Can not create a Loan</p>;
  }
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        My Profile
      </h1>
      <Loan fd={fd} />
    </main>
  );

}

  




//   //   const response = await fetch('/api/loan', { //The await keyword pauses the execution until the fetch request completes and the server responds.
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',   //tells the server to expect the incoming data in JSON format.
//   //     },
//   //     body: JSON.stringify({ //The loan details are converted to a JSON string
//   //       nic,
//   //       customerName,
//   //       fixedDepositId,
//   //       accountId,
//   //       loanAmount,
//   //       duration,
//   //       interestRate,
//   //     }),
//   //   });

//   //   const result = await response.json();
//   //   setCustomerName(result.cName);
//   //   setAccountId(result.accountId);
    
//   //   if (result.success) {
//   //     alert('Loan Created Successfully!');
//   //   } else {
//   //     alert(result.message || 'Error creating loan');
//   //   }
//   // };



//   return (
//     <main>
//       <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
//         My Profile
//       </h1>
//       <h1>{JSON.stringify(customer)}</h1>
//       {/* <Form customer={customer} /> */}
//     </main>
//   );
// }


