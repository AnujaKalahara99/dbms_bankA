import Link from "next/link";

export default function Success() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-semibold">Transaction Successful</h1>
            <Link
                href="/dashboard"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            >
                Go Back
            </Link>
        </main>
    )
}