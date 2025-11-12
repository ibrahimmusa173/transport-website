// src/Pages/Admin/UserManagement.jsx
import  { useEffect, useState } from 'react';
import { getAllUsersAdmin } from '../../api/userApi'; 

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsersAdmin();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="p-8">Loading users...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin: User Management</h1>
            <p className="mb-6 text-gray-600">Showing {users.length} registered users (Clients and Vendors).</p>
            
            {/* Table structure would go here, displaying user data, and buttons for Edit/Delete */}
            
        </div>
    );
}
export default UserManagement;