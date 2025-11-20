import { useEffect, useState } from 'react'; // Removed unused 'React' import
import { getAllProposalsAdmin } from '../../api/proposalApi'; 
import DashboardLinkButton from '../../components/DashboardLinkButton'; // <-- ADDED

function ProposalManagement() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                // Req 8: Fetch all proposals for Admin oversight
                const data = await getAllProposalsAdmin();
                setProposals(data);
            } catch (error) {
                console.error("Failed to fetch proposals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProposals();
    }, []);

    if (loading) return <div className="p-8">Loading proposals...</div>;
    
    if (proposals.length === 0) return (
        <div className="p-8">
            <DashboardLinkButton /> {/* Added here for no content case */}
            No proposals found.
        </div>
    );

    return (
        <div className="p-8">
            <DashboardLinkButton /> {/* <-- ADDED */}
            <h1 className="text-3xl font-bold mb-6 text-purple-700">Admin: Proposal Management (Req 8)</h1>
            <p className="mb-6 text-gray-600">Viewing all submitted proposals on the platform.</p>
            
            <div className="space-y-4">
                {proposals.map((proposal) => (
                    <div key={proposal._id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <h2 className="text-xl font-semibold text-gray-800">Proposal for: {proposal.tenderTitle || 'Unknown Tender'}</h2>
                        <p className="text-sm text-gray-500">Vendor ID: {proposal.vendorId}</p>
                        <p className="mt-2 text-gray-700">Budget: ${proposal.proposedBudget ? proposal.proposedBudget.toLocaleString() : 'N/A'}</p>
                        <p className="mt-1 text-gray-700">Status: <span className="font-medium text-purple-600">{proposal.status}</span></p>

                        {/* Example Admin Actions */}
                        <div className="mt-4 space-x-2">
                            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">View Proposal</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
export default ProposalManagement;