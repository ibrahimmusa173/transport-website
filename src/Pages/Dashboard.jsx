

import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, logout, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-center mt-20">Loading profile...</div>;
    }
    
    // Safety check, although ProtectedRoute should handle this
    if (!user) {
        return <div className="text-center mt-20 text-red-500">Access Denied.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-indigo-600">Welcome to your Dashboard!</h1>
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
            
            <button 
                onClick={logout} 
                className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
