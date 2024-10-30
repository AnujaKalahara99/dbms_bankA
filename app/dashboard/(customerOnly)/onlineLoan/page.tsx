import Link from 'next/link';

export default function loanHome(){

  return (
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <h1 className="__className_89d4b4 mb-4 text-xl md:text-2xl">Loan</h1>
      <div className="flex flex-col space-y-4 pl-20">
        <Link href="/dashboard/onlineLoan/create_loan">
          <button className="w-64 px-4 py-2 bg-blue-500 text-white font-normal rounded hover:bg-blue-600">
            <h2 className="__className_89d4b4">Create Loan</h2>
          </button>
        </Link>
        <Link href="/dashboard/onlineLoan/view_loan">
        <button className="w-64 px-4 py-2 bg-blue-500 text-white font-normal rounded hover:bg-blue-600">
            <h2 className="__className_89d4b4">View Loans</h2>
          </button>
        </Link>
      </div>
    </div>
  );
}

