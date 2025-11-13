// src/Pages/Admin/TenderManagement.jsx
import { useEffect, useState } from 'react';
import { getAllTendersAdmin, moderateTenderAdmin, deleteTenderAdmin } from '../../api/tenderApi'; 

function TenderManagement() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

    const fetchTenders = async () => {
        setLoading(true);
        try {
            const data = await getAllTendersAdmin(); // Req 2
            // Sort by creation date descending to see newest tenders first
            setTenders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error("Failed to fetch tenders:", error);
            setStatusMessage({ message: 'Failed to fetch tenders.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenders();
    }, []);

    // Req 3: Moderate (Approve/Reject)
    const handleModeration = async (tenderId, status) => {
        const moderationData = { status };
        let reason = '';

        if (status === 'rejected') {
            reason = prompt("Please enter a brief reason for rejection (Required for rejection):");
            if (!reason) return;
            moderationData.reason = reason;
        }

        if (!window.confirm(`Are you sure you want to set tender status to '${status}'?`)) return;
        
        setStatusMessage({ message: `Setting status to ${status}...`, type: 'info' });

        try {
            await moderateTenderAdmin(tenderId, moderationData);
            setStatusMessage({ message: `Tender status updated to '${status}' successfully.`, type: 'success' });
            await fetchTenders(); // Refresh list
        } catch (error) {
            console.error(`Moderation failed for ${status}:`, error);
            setStatusMessage({ message: error.message || `Failed to set status to ${status}.`, type: 'error' });
        }
    };
    
    // Req 4: Delete tender
    const handleDelete = async (tenderId, title) => {
        if (!window.confirm(`WARNING: Are you sure you want to permanently delete the tender "${title}"?`)) return;
        setStatusMessage({ message: 'Deleting tender...', type: 'info' });
        try {
            await deleteTenderAdmin(tenderId);
            setStatusMessage({ message: 'Tender deleted successfully.', type: 'success' });
            await fetchTenders(); // Refresh list
        } catch (error) {
            console.error("Delete failed:", error);
            setStatusMessage({ message: error.message || 'Failed to delete tender.', type: 'error' });
        }
    };


    if (loading) return <div className="p-8">Loading tenders...</div>;
    if (tenders.length === 0) return <div className="p-8">No tenders found for moderation.</div>;

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'pending_review': return 'bg-yellow-100 text-yellow-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'closed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-purple-100 text-purple-800';
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-green-700">Admin: Tender Management & Moderation (Req 2-4)</h1>
            <p className="mb-6 text-gray-600">Viewing all {tenders.length} tenders regardless of status.</p>
            
            {statusMessage.message && (
                <div className={`p-3 mb-4 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {statusMessage.message}
                </div>
            )}

            <div className="space-y-6">
                {tenders.map((tender) => (
                    <div key={tender._id} className="p-6 border rounded-lg shadow-md bg-white">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-bold text-gray-800">{tender.title}</h2>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(tender.status)}`}>
                                {tender.status.replace('_', ' ')}
                            </span>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-3">
                            Created: {new Date(tender.createdAt).toLocaleDateString()} | Deadline: {new Date(tender.deadline).toLocaleDateString()}
                        </p>
                        
                        <p className="mt-2 text-gray-700 text-sm">{tender.description ? tender.description.substring(0, 200) + '...' : 'No description.'}</p>
                        
                        {/* Moderation Buttons */}
                        <div className="mt-4 space-x-2 flex flex-wrap gap-2">
                            {tender.status !== 'active' && tender.status !== 'rejected' && (
                                <button 
                                    onClick={() => handleModeration(tender._id, 'active')} 
                                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Approve / Set Active
                                </button>
                            )}
                            {tender.status !== 'rejected' && (
                                <button 
                                    onClick={() => handleModeration(tender._id, 'rejected')} 
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Reject
                                </button>
                            )}
                            
                            <button
                                onClick={() => handleDelete(tender._id, tender.title)}
                                className="px-3 py-1 text-sm bg-gray-400 text-gray-900 rounded hover:bg-gray-500"
                            >
                                Delete (Req 4)
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default TenderManagement;