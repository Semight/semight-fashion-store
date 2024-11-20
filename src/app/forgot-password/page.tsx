"use client";

import { baseUrl } from "@/api/baseUrl";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to send reset email. Please try again.");
      }

      toast.success("Instructions have been sent to your email.");
      setEmail(""); // Clear the input after successful submission
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-secondary">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email address below, and we’ll send you instructions on how to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Enter your email"
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
              <div className="spinner w-6 h-6 border-2 border-t-2 border-white rounded-full animate-spin mx-auto"></div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className="text-secondary hover:underline">
            Back to Login
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
