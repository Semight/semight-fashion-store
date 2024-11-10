"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/api/baseUrl';

interface DashboardData {
  totalSales: number;
  newUsers: number;
  pendingOrders: number;
  products: number;
}

const DashboardSection: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('authToken');
  
        const response = await axios.get(`${baseUrl}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
  
    fetchDashboardData();
  }, []);

  if (!data) {
    return <p className='spinners flex justify-self-center'></p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="h-[4rem]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-xl">{data.totalSales}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">New Users</h3>
          <p className="text-xl">{data.newUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-xl">{data.pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow-custom">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-xl">{data.products}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;