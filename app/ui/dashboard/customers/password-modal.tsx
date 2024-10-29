"use client";

import { useState } from "react";
import { Button } from "@/app/ui/button";

// Password Modal Component
export default function PasswordModal({
  onClose,
  onVerify,
}: {
  onClose: () => void;
  onVerify: () => void;
}) {
  const [password, setPassword] = useState("");

  const handleVerify = async () => {
    alert("Incorrect password. Please try again.");
    // Add password verification logic here
    // const isVerified = await verifyPassword(password);
    // if (isVerified) {
    //   onVerify();
    //   onClose();
    // } else {
    //   alert("Incorrect password. Please try again.");
    // }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-md shadow-lg w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold mb-4">Verify Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-4">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleVerify}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
