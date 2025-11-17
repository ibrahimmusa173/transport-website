import { useEffect, useState, useCallback } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { 
    getTenderById, 
    updateTender, 
    closeTender, 
    archiveTender,
    extendTenderDeadline 
} from '../../api/tenderApi';
import { getProposalsByTender, updateProposalStatus } from '../../api/proposalApi';
import DashboardLinkButton from '../../components/DashboardLinkButton'; 

function TenderManager() {
    const { tenderId } = useParams();
    const navigate = useNavigate();
    const [tender, setTender] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState({});
    const [newDeadline, setNewDeadline] = useState('');

    const statusMap = {
        shortlisted: 'bg-blue-100 text-blue-800',
        awarded: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        submitted: 'bg-gray-100 text-gray-800',
    };

    const fetchTenderData = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch Tender details
            const tenderData = await getTenderById(tenderId);
            setTender(tenderData);
            setEditData({
                title: tenderData.title,
                description: tenderData.description,
                // Handle budget_range safely
                budget: tenderData.budget_range ? (tenderData.budget_range.split('-')[1] || '') : '', 
                deadline: tenderData.deadline.substring(0, 16), // Format for datetime-local input
                status: tenderData.status
            });

            // Fetch Proposals
            const proposalsData = await getProposalsByTender(tenderId);
            setProposals(proposalsData);

        } catch (err) {
            setError(err.message || 'Failed to load tender details.');
        } finally {
            setLoading(false);
        }
    }, [tenderId]); 

    useEffect(() => {
        fetchTenderData();
    }, [tenderId, fetchTenderData]); 

    // --- Tender Management Handlers (1c, 1d, 1e, 1f) ---

    // 1c: Edit Tender (Used in JSX below)
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // 1c: Edit Tender Submit (Used in JSX below)
    const handleEditSubmit = async () => {
        try {
            await updateTender(tenderId, editData);
            alert('Tender updated successfully.');
            fetchTenderData(); 
        } catch (err) {
            alert(`Update failed: ${err.message}`);
        }
    };

    // 1d: Extend Submission Deadline
    const handleExtendDeadline = async () => {
        if (!newDeadline) return alert("Please set a new deadline.");
        try {
            await extendTenderDeadline(tenderId, new Date(newDeadline).toISOString());
            alert('Deadline extended successfully.');
            fetchTenderData(); 
            setNewDeadline('');
        } catch (err) {
            alert(`Deadline extension failed: ${err.message}`);
        }
    };

    // 1e: Close Tender
    const handleCloseTender = async () => {
        if (!window.confirm("Are you sure you want to close this tender? No new proposals will be accepted.")) return;
        try {
            await closeTender(tenderId);
            alert('Tender closed. Status changed to CLOSED.');
            fetchTenderData(); 
        } catch (err) {
            alert(`Closure failed: ${err.message}`);
        }
    };

    // 1f: Archive Tender
    const handleArchiveTender = async () => {
        if (!window.confirm("Are you sure you want to archive this tender?")) return;
        try {
            await archiveTender(tenderId);
            alert('Tender archived.');
            navigate('/client/tenders'); 
        } catch (err) {
            alert(`Archive failed: ${err.message}`);
        }
    };


    // --- Proposal Management Handlers (2b, 2c) ---
    // (Used in JSX below)
    const handleProposalStatusUpdate = async (proposalId, status) => {
        try {
            await updateProposalStatus(proposalId, status);
            alert(`Proposal status set to ${status}.`);
            fetchTenderData(); // Refresh proposals list
        } catch (err) {
            alert(`Status update failed: ${err.message}`);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading tender details...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    if (!tender) return <div className="p-8 text-center">Tender not found.</div>;

    const isEditable = tender.status.toLowerCase() === 'draft' || tender.status.toLowerCase() === 'active';
    const canManageProposals = tender.status.toLowerCase() !== 'draft';

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <DashboardLinkButton /> 
            <h1 className="text-3xl font-bold mb-2 text-indigo-600">{tender.title}</h1>
            <span className={`text-md font-semibold px-3 py-1 rounded-full ${statusMap[tender.status.toLowerCase()] || 'bg-gray-200 text-gray-800'} capitalize`}>
                Status: {tender.status}
            </span>
            <p className="text-gray-600 mt-1">Deadline: {new Date(tender.deadline).toLocaleString()}</p>
            
            {/* --- Tender Control Panel --- */}
            <div className="mt-6 p-4 bg-gray-50 border rounded-lg shadow-inner">
                <h2 className="text-xl font-semibold mb-3">Tender Actions</h2>
                <div className="flex space-x-3 flex-wrap">
                    
                    {tender.status.toLowerCase() === 'active' && (
                        <>
                            {/* 1e: Close Tender Button */}
                            <button onClick={handleCloseTender} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-sm">
                                Close Tender (Stop Proposals)
                            </button>
                            
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="datetime-local" 
                                    value={newDeadline} 
                                    onChange={(e) => setNewDeadline(e.target.value)} 
                                    className="p-2 border rounded text-sm"
                                />
                                <button onClick={handleExtendDeadline} className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 text-sm">
                                    Extend Deadline (1d)
                                </button>
                            </div>
                        </>
                    )}

                    {tender.status.toLowerCase() === 'closed' && (
                        /* 1f: Archive Tender Button */
                        <button onClick={handleArchiveTender} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 text-sm">
                            Archive Tender
                        </button>
                    )}
                </div>
            </div>

            {/* --- Tender Editing (1c) --- */}
            {isEditable && (
                <div className="mt-8 p-6 border rounded-lg shadow-md bg-white">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700">Edit Details (1c)</h2>
                    <div className="space-y-3">
                         <input 
                            type="text" 
                            name="title" 
                            value={editData.title || ''}
                            onChange={handleEditChange} // <-- USED
                            className="w-full p-2 border rounded"
                        />
                        <textarea 
                            name="description" 
                            value={editData.description || ''}
                            onChange={handleEditChange} // <-- USED
                            rows="3"
                            className="w-full p-2 border rounded"
                        />
                         <input 
                            type="number" 
                            name="budget" 
                            placeholder="Budget"
                            value={editData.budget || ''}
                            onChange={handleEditChange} // <-- USED
                            className="w-full p-2 border rounded"
                        />
                        <button onClick={handleEditSubmit} className="mt-3 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                            Save Changes
                        </button>
                    </div>
                </div>
            )}


            {/* --- Proposal View (2a, 2b, 2c) --- */}
            {canManageProposals && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">Proposals ({proposals.length})</h2>
                    
                    {proposals.length === 0 ? (
                        <p className="text-gray-500">No proposals submitted yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {proposals.map((proposal) => (
                                <div key={proposal.id} className="p-4 border rounded-lg shadow-sm bg-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium">Proposal #{proposal.id} - Vendor Details Placeholder</h3>
                                            <p className="text-sm text-gray-700 mt-1">Pricing: ${proposal.pricing || 'N/A'}</p>
                                            <p className="text-sm text-gray-500 italic">&quot;{proposal.proposal_summary || 'No summary provided.'}&quot;</p>
                                        </div>
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusMap[proposal.status.toLowerCase()] || 'bg-gray-300'}`}>
                                            {proposal.status}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4 pt-3 border-t flex space-x-3">
                                        <button 
                                            onClick={() => handleProposalStatusUpdate(proposal.id, 'shortlisted')} // <-- USED
                                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                                            disabled={proposal.status === 'awarded' || proposal.status === 'rejected'}
                                        >
                                            Shortlist (2b)
                                        </button>
                                        <button 
                                            onClick={() => handleProposalStatusUpdate(proposal.id, 'awarded')} // <-- USED
                                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                            disabled={proposal.status === 'awarded' || proposal.status === 'rejected'}
                                        >
                                            Award (2c)
                                        </button>
                                        <button 
                                            onClick={() => handleProposalStatusUpdate(proposal.id, 'rejected')} // <-- USED
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                                            disabled={proposal.status === 'awarded' || proposal.status === 'rejected'}
                                        >
                                            Reject (2c)
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TenderManager;