// src/Pages/Client/MyTenders.jsx
import  { useEffect, useState } from 'react';
// IMPORT publishTender
import { getMyTenders, deleteTender, publishTender } from '../../api/tenderApi'; 
import { Link } from 'react-router-dom';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // NEW IMPORT

const statusColors = {
    draft: 'bg-gray-200 text-gray-800',
    active: 'bg-green-100 text-green-800',
    closed: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-red-100 text-red-800',
};

function MyTenders() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTenders = async () => {
        setLoading(true);
        try {
            const data = await getMyTenders();
            setTenders(data);
        } catch (err) {
            setError(err.message || 'Failed to load tenders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenders();
    }, []);

    // New: Handler for publishing a draft tender
    const handlePublish = async (tenderId) => {
        if (!window.confirm("Are you sure you want to publish this tender? It will become visible to vendors.")) {
            return;
        }
        try {
            await publishTender(tenderId); 
            alert('Tender published successfully! Status is now Active.');
            // Re-fetch the data to update the status in the UI
            fetchTenders(); 
        } catch (err) {
            alert(`Publication failed: ${err.message}`);
        }
    };
    
    // 1g: Delete the Tender
    const handleDelete = async (tenderId) => {
        if (!window.confirm("Are you sure you want to delete this tender? This action cannot be undone.")) {
            return;
        }
        try {
            await deleteTender(tenderId);
            setTenders(tenders.filter(t => t.id !== tenderId));
            alert('Tender deleted successfully.');
        } catch (err) {
            alert(`Deletion failed: ${err.message}`);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading client tenders...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    const tendersByStatus = tenders.reduce((acc, tender) => {
        const status = tender.status.toLowerCase();
        if (!acc[status]) acc[status] = [];
        acc[status].push(tender);
        return acc;
    }, {});


    return (
        <div className="p-8">
            <DashboardLinkButton /> {/* ADDED BUTTON HERE */}
            <h1 className="text-3xl font-bold mb-6 text-indigo-600">My Tender Dashboard ({tenders.length})</h1>
            <Link to="/client/tenders/create" className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                + Create New Tender
            </Link>

            {Object.keys(tendersByStatus).length === 0 && (
                <p className="text-gray-500">You have no tenders yet. Start by creating one!</p>
            )}

            {Object.entries(tendersByStatus).map(([status, list]) => (
                <div key={status} className="mb-8">
                    <h2 className={`text-xl font-semibold capitalize mb-3 border-b-2 pb-1 ${statusColors[status] || 'text-gray-700'}`}>
                        {status} Tenders ({list.length})
                    </h2>
                    
                    <div className="space-y-4">
                        {list.map((tender) => (
                            <div key={tender.id} className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-medium text-indigo-700">{tender.title}</h3>
                                    <p className="text-sm text-gray-500">Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${statusColors[tender.status.toLowerCase()]}`}>
                                        {tender.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="space-x-2">
                                    
                                    {/* ADDED PUBLISH BUTTON: Visible only if status is DRAFT */}
                                    {tender.status.toLowerCase() === 'draft' && (
                                        <button 
                                            onClick={() => handlePublish(tender.id)}
                                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Publish Tender
                                        </button>
                                    )}
                                    {/* END PUBLISH BUTTON */}


                                    <Link 
                                        to={`/client/tenders/${tender.id}`}
                                        className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                                    >
                                        Manage & View Proposals
                                    </Link>
                                    
                                    {(tender.status.toLowerCase() === 'draft' || tender.status.toLowerCase() === 'active') && (
                                        <button 
                                            onClick={() => handleDelete(tender.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyTenders;