import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFoundRoot() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p className="text-center">
        Could not find the requested page.
        <br /> Maybe you don't have required authentication.
      </p>
      <div className="flex flex-row gap-4">
        <Link
          href="/dashboard"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Go Back
        </Link>
        <Link
          href="/login"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
