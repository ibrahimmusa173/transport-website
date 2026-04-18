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
            
            <p className="mb-8 text-gray-600">Manage platform users, tenders, proposals, content, and review analytics.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1) User Management (Req 1) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-indigo-500">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-800">User Management</h2>
                    <p className="mb-4 text-gray-600">View, update status, and delete Client and Vendor accounts.</p>
                    <Link 
                        to="/admin/users" 
                        className="block w-full text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        Manage Users (Req 1)
                    </Link>
                </div>

                {/* 2) Tender Management (Req 2-4) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
                    <h2 className="text-2xl font-semibold mb-4 text-green-800">Tender Moderation</h2>
                    <p className="mb-4 text-gray-600">Review, moderate (approve/reject), edit, and delete Tenders.</p>
                    <Link 
                        to="/admin/tenders" 
                        className="block w-full text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Manage Tenders (Req 2-4)
                    </Link>
                </div>

                {/* 3) Proposal Management (Req 5-6) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-800">Proposal Oversight</h2>
                    <p className="mb-4 text-gray-600">View all submitted Proposals across the platform for dispute resolution.</p>
                    <Link 
                        to="/admin/proposals" 
                        className="block w-full text-center py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                        View Proposals (Req 5-6)
                    </Link>
                </div>
                
                {/* 4) Content Management (Guidelines) (Req 7-9) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
                    <h2 className="text-2xl font-semibold mb-4 text-orange-800">Content Management</h2>
                    <p className="mb-4 text-gray-600">Create, edit, and delete tender writing guidelines.</p>
                    <Link 
                        to="/admin/content/guidelines" 
                        className="block w-full text-center py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
                    >
                        Manage Guidelines (Req 7-9)
                    </Link>
                </div>

                {/* 5) Taxonomy Management (Req 10-13) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-500">
                    <h2 className="text-2xl font-semibold mb-4 text-cyan-800">Taxonomy Management</h2>
                    <p className="mb-4 text-gray-600">Manage categories, industries, and platform structure.</p>
                    <Link 
                        to="/admin/taxonomy" 
                        className="block w-full text-center py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition"
                    >
                        Manage Taxonomies (Req 10-13)
                    </Link>
                </div>

                {/* 6) Analytics & Reports (Req 14) */}
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
                    <h2 className="text-2xl font-semibold mb-4 text-red-800">Analytics & Reporting</h2>
                    <p className="mb-4 text-gray-600">View platform usage, user, and tender reports.</p>
                    <Link 
                        to="/admin/analytics" 
                        className="block w-full text-center py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        View Reports (Req 14)
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;