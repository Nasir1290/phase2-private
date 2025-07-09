"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

const ResetPassword = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing from the URL.");
      return;
    }

    if (!userId) {
      toast.error("User ID is missing from the URL.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match!");
      return;
    }
    setPasswordError(null);

    const payload = {
      token,
      data: {
        id: userId,
        password,
      },
    };
    try {
      const res = await resetPassword(payload).unwrap();
      if (res.success) {
        // setIsSuccessModalOpen(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center my-48 px-6 py-12 rounded-2xl shadow bg-white border max-w-md">
      <h1 className="text-3xl font-bold mb-10 text-center">Reset Password</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4 w-full">
        <div>
          <Label htmlFor="password" className="font-normal">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            required
            className="shadow-md rounded-lg w-full border mt-1 block border-gray-300"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="font-normal">
            Conferma Password
          </Label>
          <Input
            type="password"
            name="confirmPassword"
            required
            className="shadow-md rounded-lg w-full border mt-1 block border-gray-300"
          />
        </div>

        {passwordError && (
          <p className="text-red-500 text-sm font-medium">{passwordError}</p>
        )}

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-red text-white rounded-lg mt-3"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
