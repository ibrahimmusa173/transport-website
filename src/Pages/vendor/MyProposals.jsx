// src/Pages/Vendor/MyProposals.jsx
import { useState, useEffect } from 'react';
import { getMyProposals } from '../../api/proposalApi';
import { Link } from 'react-router-dom'; // FIX 1: Import Link for routing

const statusColors = {
    submitted: 'bg-blue-100 text-blue-800',
    viewed: 'bg-yellow-100 text-yellow-800',
    shortlisted: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    awarded: 'bg-green-100 text-green-800 font-bold',
};

function MyProposals() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const data = await getMyProposals();
                setProposals(data);
            } catch (err) {
                setError('Failed to fetch your proposals dashboard.');
            } finally {
                setLoading(false);
            }
        };
        fetchProposals();
    }, []);

    if (loading) return <div className="p-8">Loading proposals dashboard...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-green-700">My Submitted Proposals</h1>
            
            {proposals.length === 0 ? (
                // FIX 1 applied: Link is now defined
                <p className="text-lg text-gray-500">You have not submitted any proposals yet. <Link to="/vendor/tenders" className='text-green-600 hover:underline'>Find Tenders now.</Link></p>
            ) : (
                <div className="space-y-6">
                    {proposals.map((proposal) => (
                        <div key={proposal.proposal_id} className="p-6 border rounded-xl shadow-lg bg-white">
                            <div className="flex justify-between items-start mb-3 border-b pb-2">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Proposal for: {proposal.tender_title || `Tender ID: ${proposal.tender_id}`}
                                </h2>
                                <span 
                                    className={`px-3 py-1 text-sm rounded-full capitalize ${statusColors[proposal.status?.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}
                                >
                                    {proposal.status || 'Submitted'}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-2">
                                <span className="font-medium">Pricing:</span> {proposal.pricing}
                            </p>
                            <p className="text-sm text-gray-500 italic truncate">
                                {/* FIX 2 & 3: Escape quotes using &quot; */}
                                Cover Letter snippet: &quot;{proposal.cover_letter?.substring(0, 80)}...&quot;
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyProposals;