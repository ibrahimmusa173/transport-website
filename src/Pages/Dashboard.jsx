// src/Pages/Dashboard.jsx (MODIFIED - Admin Navigation Added)
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { user, logout, isLoading } = useAuth();
    // ... (Error handling and loading state remain the same) ...

    if (isLoading) {
        return <div className="text-center mt-20">Loading profile...</div>;
    }
    
    if (!user) {
        return <div className="text-center mt-20 text-red-500">Access Denied.</div>;
    }

    const userType = user.user_type ? user.user_type.toLowerCase() : '';
    const isClient = userType === 'client';
    const isVendor = userType === 'vendor';
    const isAdmin = userType === 'admin'; // <-- NEW ADMIN CHECK

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-indigo-600">Welcome to your Dashboard!</h1>
            
            {/* ADMIN specific navigation menu (NEW) */}
            {isAdmin && (
                <div className="mb-10 p-6 bg-red-100 rounded-lg shadow-inner border-l-4 border-red-500">
                    <h2 className="text-2xl font-semibold mb-4 text-red-700">Administrator Panel</h2>
                    <div className="flex space-x-4">
                        <Link 
                            to="/admin/dashboard" 
                            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150"
                        >
                            Go to Admin Dashboard
                        </Link>
                    </div>
                </div>
            )}
            
            {/* Client specific navigation menu (Existing) */}
            {isClient && (
                <div className="mb-10 p-6 bg-indigo-50 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Client Tender Management</h2>
                    <div className="flex space-x-4">
                        <Link 
                            to="/client/tenders" 
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
                        >
                            View My Tenders (Dashboard)
                        </Link>
                        <Link 
                            to="/client/tenders/create" 
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                        >
                            Create New Tender
                        </Link>
                    </div>
                </div>
            )}

            {/* VENDOR specific navigation menu (Existing) */}
            {isVendor && (
                <div className="mb-10 p-6 bg-green-50 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">Vendor Opportunities</h2>
                    <div className="flex space-x-4">
                        <Link 
                            to="/vendor/tenders" 
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                        >
                            Search Active Tenders (1a)
                        </Link>
                         <Link 
                            to="/vendor/proposals" 
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-150"
                        >
                            My Submitted Proposals (2b)
                        </Link>
                    </div>
                </div>
            )}
            
            {/* ... (Rest of User Profile Details and Logout button remain the same) ... */}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-lg mx-auto p-6 border border-gray-200">
                <h3 className="text-xl font-medium leading-6 text-gray-900 mb-4 border-b pb-2">User Profile Details</h3>
                <dl className="space-y-4">
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.name || 'N/A'}</dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email || 'N/A'}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-500">Company</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.company_name || 'N/A'}</dd>
                    </div>
                     <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                        <dt className="text-sm font-medium text-gray-500">User Type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{user.user_type || 'N/A'}</dd>
                    </div>
                </dl>
            </div>
            
            <button onClick={logout} className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;