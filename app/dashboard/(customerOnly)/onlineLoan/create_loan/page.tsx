
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

  




