"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
};

const deleteUser = async (userId: string) => {
    await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    });
};

const UsersSection: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]); // Replace `any` with the appropriate type for users

    useEffect(() => {
        const loadUsers = async () => {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
        };

        loadUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        await deleteUser(userId);
        // Refresh the user list after deletion
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

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
                        <tr key={user.id}>
                            <td className="p-2 border-b">{user.id}</td>
                            <td className="p-2 border-b">{user.name}</td>
                            <td className="p-2 border-b">{user.email}</td>
                            <td className="p-2 border-b">{user.role}</td>
                            <td className="p-2 border-b">
                                {/* Removed Edit button */}
                                <button
                                    className="text-danger ml-4 flex items-center"
                                    onClick={() => handleDelete(user.id)}
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
