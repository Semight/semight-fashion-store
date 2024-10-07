"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);

        // Redirect based on user role
        if (data.user.role === "admin") {
          toast.success("Login successful! Redirecting to admin dashboard...");
          setTimeout(() => {
            router.push("/admin");
          }, 2000);
        } else {
          toast.success("Login successful! Redirecting to cart...");
          setTimeout(() => {
            router.push("/cart");
          }, 2000);
        }
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-32 md:px-[25%] flex flex-col items-center md:w-full my-20">
        <div className="mt-16 w-[900px] md:w-full bg-white shadow-2xl rounded-3xl">
          <div className="px-10 md:px-5 py-[2rem] md:py-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black font-extrabold text-[40px] md:text-[24px] leading-[21.8px] font-merriweather">
                Log In
              </h2>
              <div>
                <p className="text-black font-extrabold text-[20px] md:text-[15px] leading-[15px] font-merriweather">
                  Don't have an account?
                </p>
                <Link
                  className="text-secondary font-semibold text-[12px] md:text-[12px] underline leading-[15px] font-merriweather"
                  href={"/signup"}
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-4">Login</h1>
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
                    {showPassword ? (
                      <MdVisibilityOff size={24} />
                    ) : (
                      <MdVisibility size={24} />
                    )}
                  </button>
                </div>
              </div>
              <Link href={"/forgot-password"}>
                <p className="text-brand text-[15px] hover:underline leading-[15px] font-merriweather pl-[5rem] md:pl-0 mt-4 md:mt-6">
                  Forgot password
                </p>
              </Link>
              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="text-white bg-secondary hover:bg-light-yellow px-8 md:w-[50%] py-2 md:py-3 rounded-lg text-[20px] leading-[21.8px] font-merriweather flex items-center justify-center"
                >
                  {isLoading ? "Logging in..." : "Login"}
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

export default Login;
