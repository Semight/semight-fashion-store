"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import { baseUrl } from "@/api/baseUrl";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Signup failed. Please try again.");
        toast.error(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[10%] lg:px-[25%] flex flex-col items-center md:w-full my-16 lg:my-20">
        <div className="mt-10 w-full md:max-w-[700px] bg-white shadow-2xl rounded-3xl">
          <div className="px-6 md:px-10 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-black font-extrabold text-3xl md:text-2xl font-merriweather">
                Sign Up
              </h2>
              <div className="text-center md:text-right mt-4 md:mt-0">
                <p className="text-black font-extrabold text-lg md:text-base font-merriweather">
                  Already have an account?
                </p>
                <Link
                  className="text-secondary font-semibold text-sm underline font-merriweather"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="container mx-auto px-2">
              <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Create an Account</h1>
              <div className="mb-4">
                <label className="block mb-2">Full Name</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="border rounded-md p-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="border rounded-md p-2 w-full"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="border rounded-md p-2 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary"
                  >
                    {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="border rounded-md p-2 w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary"
                  >
                    {showConfirmPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
                  </button>
                </div>
              </div>
              {error && <p className="text-danger mb-4">{error}</p>}
              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  onClick={handleSignup}
                  className="text-white bg-secondary hover:bg-light-yellow w-full md:w-[50%] py-3 rounded-lg text-lg font-merriweather flex items-center justify-center"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Signup;
