// src/Pages/Admin/UserManagement.jsx
import { useEffect, useState } from 'react';
import { getAllUsersAdmin, updateUserAdmin, deleteUserAdmin } from '../../api/userApi'; 
import { useAuth } from '../../context/AuthContext'; 

function UserManagement() {
    const { user: currentUser } = useAuth(); // Current authenticated admin user
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsersAdmin(); // Req 1a
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setStatusMessage({ message: 'Failed to fetch users.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Req 1c: Update status (Activate/Deactivate) or change user_type (Manage)
    const handleUpdateUser = async (userId, updateData) => {
        if (!window.confirm(`Are you sure you want to update user status?`)) return;
        setStatusMessage({ message: 'Updating user status...', type: 'info' });
        try {
            await updateUserAdmin(userId, updateData);
            setStatusMessage({ message: 'User updated successfully.', type: 'success' });
            await fetchUsers(); // Refresh list
        } catch (error) {
            console.error("Update failed:", error);
            setStatusMessage({ message: error.message || 'Failed to update user.', type: 'error' });
        }
    };
    
    // Req 1d: Delete user account
    const handleDeleteUser = async (userId, name) => {
         if (!window.confirm(`WARNING: Are you sure you want to permanently delete user ${name}?`)) return;
        setStatusMessage({ message: 'Deleting user...', type: 'info' });
        try {
            await deleteUserAdmin(userId);
            setStatusMessage({ message: 'User deleted successfully.', type: 'success' });
            await fetchUsers(); // Refresh list
        } catch (error) {
            console.error("Delete failed:", error);
            setStatusMessage({ message: error.message || 'Failed to delete user.', type: 'error' });
        }
    };

    const filteredUsers = users.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.user_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (loading) return <div className="p-8">Loading users...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">Admin: User Management (Req 1)</h1>
            
            {statusMessage.message && (
                <div className={`p-3 mb-4 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {statusMessage.message}
                </div>
            )}

             <input
                type="text"
                placeholder="Search users by name, email, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm"
            />

            <p className="mb-4 text-gray-600">Showing {filteredUsers.length} filtered users out of {users.length} total.</p>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.user_type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {/* Disable actions on the current Admin user */}
                                    {user._id !== currentUser._id ? (
                                        <>
                                            <button
                                                onClick={() => handleUpdateUser(user._id, { is_active: !user.is_active })}
                                                className={`text-indigo-600 hover:text-indigo-900 ${!user.is_active ? 'bg-green-100 p-1 rounded' : 'bg-red-100 p-1 rounded'}`}
                                                title={user.is_active ? 'Deactivate' : 'Activate'}
                                            >
                                                {user.is_active ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id, user.name)}
                                                className="text-red-600 hover:text-red-900 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-gray-400">Current Admin</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UserManagement;