"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";

const Signup = () => {
  const [fullName, setFullName] = useState<string>("");
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
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, phoneNumber, password }),
      });

      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        console.error("Signup failed");
        setError("Signup failed. Please try again.");
        toast.error("Signup failed. Please try again.");
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
    {/* <div className="h-32"></div> */}
    <div className="px-32 md:px-[25%] flex flex-col items-center md:w-full my-20">
      <div className="mt-16 w-[900px] md:w-full bg-white shadow-2xl rounded-3xl">
        <div className="px-10 md:px-5 py-[2rem] md:py-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-black font-extrabold text-[40px] md:text-[24px] leading-[21.8px] font-merriweather">
              Sign Up
            </h2>
            <div>
              <p className="text-black font-extrabold text-[20px] md:text-[15px] leading-[15px] font-merriweather">Already have an account?</p>
            <Link
              className="text-black font-semibold text-[12px] md:text-[12px] underline leading-[15px] font-merriweather"
              href={"/login"}
            >
              Login
            </Link>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="border rounded-md p-2 w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
                </button>
              </div>
            </div>
            <div className="mb-1">
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
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
                className="text-white bg-blue hover:bg-light-blue px-8 md:w-[50%] py-2 md:py-3 rounded-lg text-[20px] leading-[21.8px] font-merriweather flex items-center justify-center"
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
