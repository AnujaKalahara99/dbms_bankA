import Link from "next/link";

export default function page() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center bg-white p-4 rounded-lg bg-opacity-60">Something went wrong</h1>
                <Link href="/dashboard/atm" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">Go Back</Link>
            </div>
        </>
    );
}