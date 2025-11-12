// src/Pages/Admin/AdminDashboard.jsx

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
    const { user } = useAuth();
    
    // Basic role protection check
    if (user?.user_type.toLowerCase() !== 'admin') {
        return <div className="p-8 text-red-500">Unauthorized Access. Only Administrators may view this page.</div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-red-700 border-b pb-4">Administrator Control Panel</h1>
            
            <p className="mb-8 text-gray-600">Manage platform users, tenders, and proposals.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1) User Management */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-indigo-500">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-800">User Management</h2>
                    <p className="mb-4 text-gray-600">View, update, and delete Client and Vendor accounts.</p>
                    <Link 
                        to="/admin/users" 
                        className="block w-full text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        Manage Users
                    </Link>
                </div>

                {/* 2) Tender Management */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">Tender Management</h2>
                    <p className="mb-4 text-gray-600">Review, moderate (approve/reject), edit, and delete Tenders.</p>
                    <Link 
                        to="/admin/tenders" 
                        className="block w-full text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Manage Tenders
                    </Link>
                </div>

                {/* 3) Proposal Management */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-800">Proposal Management</h2>
                    <p className="mb-4 text-gray-600">View all submitted Proposals across the platform.</p>
                    <Link 
                        to="/admin/proposals" 
                        className="block w-full text-center py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                        View Proposals
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;