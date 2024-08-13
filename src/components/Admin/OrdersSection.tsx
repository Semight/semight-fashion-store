"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';

// Function to fetch orders from an API
const fetchOrders = async () => {
    // Implement your data fetching logic here
    // For example:
    const response = await fetch('/api/orders');
    const data = await response.json();
    return data;
};

const OrdersSection: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]); // Replace `any` with the appropriate type for orders

    useEffect(() => {
        const loadOrders = async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
        };

        loadOrders();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            {/* Remove Add New Order button */}
            <table className="w-full bg-white border rounded shadow-md">
                <thead>
                    <tr>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Customer</th>
                        <th className="p-2 border-b">Total</th>
                        <th className="p-2 border-b">Status</th>
                        <th className="p-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className="p-2 border-b">{order.id}</td>
                            <td className="p-2 border-b">{order.customer}</td>
                            <td className="p-2 border-b">{order.total}</td>
                            <td className="p-2 border-b">{order.status}</td>
                            <td className="p-2 border-b">
                                <button className="text-blue">View</button>
                                <button className="text-danger">Cancel</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersSection;
