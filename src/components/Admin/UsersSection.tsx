"use client";
import { baseUrl } from '@/api/baseUrl';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

interface User {
    _id: string; // Change id to _id to match the database structure
    name: string;
    email: string;
    role: string;
}

const fetchUsers = async (): Promise<User[]> => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${baseUrl}/api/users/users`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

const deleteUser = async (userId: string): Promise<void> => {
    if (!userId || userId.length !== 24) {
        console.error("Invalid userId:", userId);
        throw new Error("Invalid user ID");
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No auth token found');
    }

    const response = await fetch(`${baseUrl}/api/users/users/byId/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData);
        throw new Error('Failed to delete user');
    }
};

const UsersSection: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setDeletingUserId(userId); // Show loading for the specific delete operation
            try {
                // Optimistically update the state
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                await deleteUser(userId);
            } catch (err) {
                // Revert optimistic update by re-fetching users
                setError('Failed to delete user. Please try again.');
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } finally {
                setDeletingUserId(null); // Reset loading state
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="w-full bg-white border rounded shadow-md">
                <thead>
                    <tr>
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Role</th>
                        <th className="p-2 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="p-2 border-b">{user._id}</td> {/* Use _id instead of id */}
                            <td className="p-2 border-b">{user.name}</td>
                            <td className="p-2 border-b">{user.email}</td>
                            <td className="p-2 border-b">{user.role}</td>
                            <td className="p-2 border-b">
                                <button
                                    className={`text-danger ml-4 flex items-center ${deletingUserId === user._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleDelete(user._id)} // Use _id here as well
                                    disabled={deletingUserId === user._id} // Disable button while deleting
                                >
                                    <AiOutlineDelete className="mr-2" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersSection;
