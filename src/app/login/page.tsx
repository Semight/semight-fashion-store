"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@/Context/AuthContext";
import { baseUrl } from "@/api/baseUrl";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);

        const userRole = data.user?.role?.toLowerCase() || ""; 

        if (userRole === "admin") {
          toast.success("Login successful! Redirecting to admin dashboard...");
          setTimeout(() => {
            login();
            router.push("/admin");
          }, 2000);
        } else if (userRole === "user") {
          toast.success("Login successful! Redirecting to cart...");
          setTimeout(() => {
            login();
            router.push("/cart");
          }, 2000);
        }
      } else {
        toast.error(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-8 lg:px-32 flex flex-col items-center md:w-full mt-[8rem] mb-[2rem] md:mt-[9rem] md:mb-[4rem]">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl">
          <div className="px-6 md:px-10 py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-black font-extrabold text-2xl md:text-3xl leading-tight font-merriweather mb-4 md:mb-0">
                Log In
              </h2>
              <div className="text-center md:text-left">
                <p className="text-black font-extrabold text-lg md:text-base leading-tight font-merriweather">
                  Don't have an account?
                </p>
                <Link
                  className="text-secondary font-semibold text-sm underline font-merriweather"
                  href={"/signup"}
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                className="border rounded-md p-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border rounded-md p-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <MdVisibilityOff size={24} />
                  ) : (
                    <MdVisibility size={24} />
                  )}
                </button>
              </div>
            </div>
            <Link href={"/forgot-password"}>
              <p className="text-brand text-sm hover:underline font-merriweather text-center md:text-left mt-4">
                Forgot password?
              </p>
            </Link>
            <div className="flex items-center justify-center mt-8">
              <button
                type="submit"
                onClick={handleLogin}
                disabled={isLoading}
                className="text-white bg-secondary hover:bg-light-yellow px-6 md:w-1/2 py-2 rounded-lg text-lg font-merriweather flex items-center justify-center"
              >
                {isLoading ? <div className="spinner"></div> : "Login"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default Login;
