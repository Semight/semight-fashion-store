"use client";
import React from 'react';

const DashboardSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className='h-[4rem]'></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-xl">10,245</p>
        </div>
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">New Users</h3>
          <p className="text-xl">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-xl">87</p>
        </div>
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-xl">4,567</p>
        </div>
      </div>
      {/* Add more widgets or charts here */}
    </div>
  );
};

export default DashboardSection;
