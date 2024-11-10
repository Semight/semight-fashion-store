"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineUser, AiOutlineAppstore, AiOutlineShoppingCart, AiOutlineBarChart } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import DashboardSection from "./DashboardSection";
import ProductsSection from "./ProductsSection";
import UsersSection from "./UsersSection";
import OrdersSection from "./OrdersSection";
import Navbar from "../Navbar/NavBar";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("userDetails");
    window.location.assign("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="no-underline">
      <Navbar />
      <div className="h-[6rem]"></div>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 w-64 bg-[#E5B80B] text-white min-h-screen flex flex-col mt-[5rem] transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64`}
        >
          <div className="p-6 flex-grow">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
            <ul className="flex flex-col gap-4">
              <li
                onClick={() => setActiveSection("dashboard")}
                className={`p-2 flex flex-row gap-1 items-center cursor-pointer ${activeSection === "dashboard" ? "bg-black" : ""}`}
              >
                <AiOutlineBarChart /> Dashboard
              </li>
              <li
                onClick={() => setActiveSection("products")}
                className={`p-2 flex flex-row gap-1 items-center cursor-pointer ${activeSection === "products" ? "bg-black" : ""}`}
              >
                <AiOutlineAppstore /> Products
              </li>
              <li
                onClick={() => setActiveSection("users")}
                className={`p-2 flex flex-row gap-1 items-center cursor-pointer ${activeSection === "users" ? "bg-black" : ""}`}
              >
                <AiOutlineUser /> Users
              </li>
              <li
                onClick={() => setActiveSection("orders")}
                className={`p-2 flex flex-row gap-1 items-center cursor-pointer ${activeSection === "orders" ? "bg-black" : ""}`}
              >
                <AiOutlineShoppingCart /> Orders
              </li>
            </ul>
            <button onClick={handleLogout} className="w-full mt-4 p-2 bg-red-600 text-white flex items-center justify-center">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 p-6 sm:p-[10px] transition-all ${isSidebarOpen ? "ml-64" : "ml-0"} md:ml-64`}>
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "products" && <ProductsSection />}
          {activeSection === "users" && <UsersSection />}
          {activeSection === "orders" && <OrdersSection />}
        </main>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-4 absolute top-28 right-4 z-10 bg-[#E5B80B] text-white rounded-md"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu />
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
