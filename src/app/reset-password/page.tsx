"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/api/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = decodeURIComponent(searchParams.get("token") || "");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");

    if (!token || token.trim() === "") {
      toast.error("Invalid or missing token. Please check the URL.");
      console.error("Token is invalid or missing.");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      console.error("Password fields are empty.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      console.error("Password is too short.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      console.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    console.log("Loading set to true.");
    try {
      const response = await fetch(`${baseUrl}/api/users/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: password,
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Failed to reset password.");
      }

      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Error resetting password:", err.message || err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      console.log("Loading set to false.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-secondary font-semibold mb-2"
            >
              New Password
            </label>
            <input
              type="text"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-secondary font-semibold mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-secondary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white bg-secondary hover:bg-light-yellow rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-secondary ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
