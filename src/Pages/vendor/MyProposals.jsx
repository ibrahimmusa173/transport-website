// src/Pages/Vendor/MyProposals.jsx
import { useState, useEffect } from 'react';
import { getMyProposals, withdrawProposal } from '../../api/proposalApi';
import { Link } from 'react-router-dom';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // Import the new component



const statusColors = {
    submitted: 'bg-blue-100 text-blue-800',
    viewed: 'bg-yellow-100 text-yellow-800',
    shortlisted: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    
    accepted: 'bg-green-100 text-green-800 font-bold',
    withdrawn: 'bg-gray-200 text-gray-700 italic', // New status color
};

function MyProposals() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusMessage, setStatusMessage] = useState({}); // To hold success/error messages per action

    const fetchProposals = async () => {
        try {
            // Requirement 2a: View dashboard of submitted proposals and status
            const data = await getMyProposals();
            setProposals(data);
        } catch (err) {
            setError('Failed to fetch your proposals dashboard.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, []);
    
    // Handle Proposal Withdrawal (Req 3)
    const handleWithdraw = async (proposalId) => {
        if (!window.confirm("Are you sure you want to withdraw this proposal? This action cannot be undone.")) {
            return;
        }

        setStatusMessage(prev => ({ ...prev, [proposalId]: 'Withdrawing...' }));

        try {
            await withdrawProposal(proposalId); 
            // Update the local state instantly
            setProposals(prev => 
                prev.map(p => 
                    p.proposal_id === proposalId 
                        ? { ...p, status: 'Withdrawn' } 
                        : p
                )
            );
            setStatusMessage(prev => ({ ...prev, [proposalId]: 'Proposal successfully withdrawn.' }));

        } catch (err) {
            console.error("Withdraw failed:", err);
            setStatusMessage(prev => ({ ...prev, [proposalId]: err.message || 'Failed to withdraw proposal.' }));
        }
    };

    if (loading) return <div className="p-8">Loading proposals dashboard...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <DashboardLinkButton /> {/* ADDED BUTTON */}
            
            <h1 className="text-3xl font-bold mb-8 text-green-700">My Submitted Proposals</h1>
            
            {proposals.length === 0 ? (
                <p className="text-lg text-gray-500">You have not submitted any proposals yet. <Link to="/vendor/tenders" className='text-green-600 hover:underline'>Find Tenders now.</Link></p>
            ) : (
                <div className="space-y-6">
                    {proposals.map((proposal) => {
                        const currentStatus = proposal.status?.toLowerCase() || 'submitted';
                        // Allow withdrawal only if status is submitted (assuming deadline hasn't passed)
                        const isWithdrawable = currentStatus === 'submitted'; 
                        
                        return (
                            <div key={proposal.proposal_id} className="p-6 border rounded-xl shadow-lg bg-white">
                                <div className="flex justify-between items-start mb-3 border-b pb-2">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Proposal for: {proposal.tender_title || `Tender ID: ${proposal.tender_id}`}
                                    </h2>
                                    <span 
                                        className={`px-3 py-1 text-sm rounded-full capitalize ${statusColors[currentStatus] || 'bg-gray-100 text-gray-800'}`}
                                    >
                                        {currentStatus}
                                    </span>
                                </div>
                                
                                {statusMessage[proposal.proposal_id] && (
                                    <p className={`text-sm mb-2 ${statusMessage[proposal.proposal_id].includes('successfully') ? 'text-green-600' : statusMessage[proposal.proposal_id].includes('Withdrawing') ? 'text-yellow-600' : 'text-red-500'}`}>
                                        {statusMessage[proposal.proposal_id]}
                                    </p>
                                )}

                                <p className="text-gray-700 mb-2">
                                    <span className="font-medium">Pricing:</span> {proposal.pricing ? `$${parseFloat(proposal.pricing).toLocaleString()}` : 'N/A'}
                                </p>
                                <p className="text-sm text-gray-500 italic truncate mb-4">
                                    Cover Letter snippet: &quot;{proposal.cover_letter?.substring(0, 80)}...&quot;
                                </p>
                                
                                <div className="flex space-x-4 items-center">
                                    {isWithdrawable && (
                                        <button
                                            onClick={() => handleWithdraw(proposal.proposal_id)}
                                            className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                            disabled={statusMessage[proposal.proposal_id]?.includes('Withdrawing')}
                                        >
                                            Withdraw Proposal
                                        </button>
                                    )}
                                    
                                    <Link 
                                        to={`/vendor/tenders/${proposal.tender_id}`}
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        View Original Tender
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MyProposals;