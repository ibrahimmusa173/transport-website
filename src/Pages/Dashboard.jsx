
// src/Pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// NEW IMPORTS for Notifications and Guidelines (UPDATED IMPORTS)
import { getMyNotifications, markNotificationAsRead, getUnreadNotificationCount, markAllNotificationsAsRead } from '../api/notificationApi'; 
import { getTenderGuidelines } from '../api/contentApi'; 


function Dashboard() {
    const { user, logout, isLoading, updateProfile } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(() => ({
        name: user?.name || '',
        company_name: user?.company_name || ''
    }));
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

    // NEW STATE for Notifications and Guidelines
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // Explicit state for count
    const [notificationsLoading, setNotificationsLoading] = useState(true);
    const [notificationsError, setNotificationsError] = useState(null);
    const [guidelinesContent, setGuidelinesContent] = useState(''); 


    // Effect to synchronize editData with the authenticated user object
    useEffect(() => {
        if (user) {
            if (!isEditing) {
                setEditData({
                    name: user.name || '',
                    company_name: user.company_name || ''
                });
            }
        }
    }, [user, isEditing]);

    // NEW: Effect to fetch notifications (for both client and vendor) and guidelines (client only)
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;
            
            // --- 1. Fetch Notifications (Client & Vendor) ---
            setNotificationsLoading(true);
            try {
                // Use Promise.all to fetch list and count concurrently
                const [fetchedNotifications, countData] = await Promise.all([
                    getMyNotifications(),
                    getUnreadNotificationCount(),
                ]);
                
                const unreadNotifs = Array.isArray(fetchedNotifications) 
                    ? fetchedNotifications.filter(n => !n.read_at)
                    : [];
                
                setNotifications(unreadNotifs); 
                
                // Determine the count, prioritizing the dedicated endpoint response
                // Backend is expected to return { count: N } for getUnreadNotificationCount
                const resolvedCount = (typeof countData === 'object' && countData !== null && 'count' in countData)
                    ? countData.count 
                    : unreadNotifs.length;
                    
                setUnreadCount(resolvedCount); 
                
                setNotificationsError(null);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
                // Keep the robust error message for debugging the backend
                setNotificationsError('Failed to load notifications. (Check API endpoint /api/notifications/my and /api/notifications/unread-count)');
            } finally {
                setNotificationsLoading(false);
            }

            // --- 2. Fetch Guidelines (Client Only) ---
            if (user.user_type === 'client') {
                 try {
                    let guidelinesData = await getTenderGuidelines();
                    
                    // Handle array response if the client read API returns a list
                    if (Array.isArray(guidelinesData) && guidelinesData.length > 0) {
                        guidelinesData = guidelinesData[0];
                    }

                    const contentExists = guidelinesData && guidelinesData.content;
                    
                    setGuidelinesContent(contentExists ? 'Tender guidelines are available. Click "View Tender Guidelines" above to read the full document.' : 'No guidelines snippet available.');
                } catch (err) {
                    console.error("Failed to fetch guidelines snippet:", err);
                    setGuidelinesContent('Failed to load guidelines status. (Check API endpoint /api/content/guidelines)');
                }
            } else {
                setGuidelinesContent(''); // Clear for vendor/admin
            }
        };

        fetchDashboardData();
    }, [user]); 


    // --- Helper Functions ---
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ message: 'Updating profile...', type: 'info' });
        try {
            await updateProfile({
                name: editData.name,
                company_name: editData.company_name
            });
            setStatusMessage({ message: 'Profile updated successfully!', type: 'success' });
            setIsEditing(false);
        } catch (err) {
            setStatusMessage({ message: err.message || 'Failed to update profile.', type: 'error' });
        }
    };

    const toggleEdit = () => {
        if (!isEditing) {
            setEditData({
                name: user.name || '',
                company_name: user.company_name || ''
            });
            setStatusMessage({ message: '', type: '' });
        }
        setIsEditing(!isEditing);
    };

    // Handle marking specific notification as read (Requirement 1)
    const handleMarkAsRead = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications(prev => prev.filter(n => n.id !== notificationId)); // Remove from unread list
            setUnreadCount(prev => Math.max(0, prev - 1)); // Decrement count
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
            // Optionally show an error message
        }
    };
    
    // Handle marking ALL notifications as read (Requirement 1)
    const handleMarkAllAsRead = async () => {
        if (!window.confirm("Mark all unread notifications as read?")) return;
        try {
            await markAllNotificationsAsRead();
            setNotifications([]); // Clear the display list
            setUnreadCount(0);
            setStatusMessage({ message: 'All notifications marked as read.', type: 'success' });
        } catch (err) {
            console.error("Failed to mark all as read:", err);
            setStatusMessage({ message: 'Failed to mark all notifications as read.', type: 'error' });
        }
    };

    if (isLoading) {
        return <div className="text-center mt-20">Loading profile...</div>;
    }

    if (!user) {
        return <div className="text-center mt-20 text-red-500">Access Denied.</div>;
    }

    const userType = user.user_type ? user.user_type.toLowerCase() : '';
    const isAdmin = userType === 'admin';
    const isClient = userType === 'client';
    const isVendor = userType === 'vendor';


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
                    <div className="flex space-x-4 flex-wrap gap-3"> 
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
                        {/* NEW GUIDELINES LINK */}
                        <Link
                            to="/client/guidelines"
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-150"
                        >
                            View Tender Guidelines
                        </Link>
                    </div>
                </div>
            )}

            {/* VENDOR specific navigation menu (Existing) */}
            {isVendor && (
                <div className="mb-10 p-6 bg-green-50 rounded-lg shadow-inner">
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">Vendor Opportunities</h2>
                    <div className="flex space-x-4 flex-wrap gap-3"> 
                        <Link
                            to="/vendor/tenders"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150"
                        >
                            Search Active Tenders
                        </Link>
                        <Link
                            to="/vendor/proposals"
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-150"
                        >
                            My Submitted Proposals
                        </Link>
                    </div>
                </div>
            )}
            
            {/* Guidelines Snippet Usage (For Client) */}
            {isClient && guidelinesContent && (
                <div className="mb-10 p-4 bg-purple-50 rounded-lg shadow-sm border-l-4 border-purple-400">
                    <p className="text-sm text-gray-700 font-medium">Guidelines Status:</p>
                    <p className="text-gray-600 mt-1">{guidelinesContent}</p>
                </div>
            )}


            {/* Dynamic Notifications Section (For Client and VENDOR) */}
            {(isClient || isVendor) && (
                <div className="mb-10 p-6 bg-blue-50 rounded-lg shadow-inner border-l-4 border-blue-400">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Notifications ({unreadCount} Unread)</h2>
                    {notificationsLoading ? (
                        <p className="text-blue-600">Loading notifications...</p>
                    ) : notificationsError ? (
                        <p className="text-red-500">{notificationsError}</p>
                    ) : notifications.length === 0 ? (
                        <p className="text-gray-600">No new notifications.</p>
                    ) : (
                        <div className="space-y-3">
                            {notifications.map(notification => (
                                <div key={notification.id} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-blue-100">
                                    <p className="text-gray-700">
                                        <span className={`w-2 h-2 ${isVendor ? 'bg-purple-500' : notification.type === 'proposal' ? 'bg-green-500' : 'bg-orange-500'} rounded-full inline-block mr-2`}></span>
                                        {/* Display specific message for vendor status updates (Req 6) */}
                                        {isVendor && notification.type === 'proposal_status' ? 
                                            `Proposal status updated to "${notification.new_status}" for tender: ${notification.tender_title}` :
                                            notification.message || `New notification of type: ${notification.type}.`}
                                        
                                        <span className="text-xs text-gray-500 ml-2">({new Date(notification.created_at).toLocaleString()})</span>
                                    </p>
                                    <button
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        className="text-xs text-blue-500 hover:underline ml-4"
                                    >
                                        Mark as Read
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Link and Mark All as Read button */}
                    {(notifications.length > 0 || unreadCount > 0) && (
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                You have {unreadCount} unread items.
                            </p>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Mark All as Read
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}


            {/* Profile View/Edit Section (Unchanged) */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-lg mx-auto p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-xl font-medium leading-6 text-gray-900">User Profile Details</h3>
                    <button
                        onClick={toggleEdit}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        disabled={isLoading}
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                </div>

                {statusMessage.message && (
                    <div className={`p-3 mb-4 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {statusMessage.message}
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editData.name}
                                onChange={handleEditChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                id="company_name"
                                name="company_name"
                                value={editData.company_name}
                                onChange={handleEditChange}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        {/* Display immutable fields */}
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                            <dt className="text-sm font-medium text-gray-500">Email (Read-only)</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email || 'N/A'}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-md">
                            <dt className="text-sm font-medium text-gray-500">User Type (Read-only)</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{user.user_type || 'N/A'}</dd>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Profile Changes'}
                        </button>
                    </form>
                ) : (
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
                )}
            </div>

            <button onClick={logout} className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
