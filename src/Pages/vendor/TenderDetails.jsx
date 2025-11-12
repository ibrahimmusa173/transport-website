// src/Pages/Vendor/TenderDetails.jsx
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTenderDetails } from '../../api/tenderApi';
import { submitProposal } from '../../api/proposalApi';

function TenderDetails() {
    const { tenderId } = useParams();
    const [tender, setTender] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [proposal, setProposal] = useState({
        cover_letter: '',
        proposed_solution: '',
        pricing: '',
    });

    useEffect(() => {
        const fetchTender = async () => {
            try {
                const data = await getTenderDetails(tenderId);
                setTender(data);
            } catch (err) {
                setError('Failed to load tender details.');
            } finally {
                setLoading(false);
            }
        };
        fetchTender();
    }, [tenderId]);

    const handleProposalChange = (e) => {
        setProposal(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleProposalSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('Submitting...');
        setError(null);

        try {
            await submitProposal({
                ...proposal,
                tender_id: tenderId, 
            });
            setSubmissionStatus('Proposal submitted successfully!');
            // Reset form
            setProposal({ cover_letter: '', proposed_solution: '', pricing: '' });
        } catch (err) {
            setError('Failed to submit proposal. Check inputs and try again.');
            setSubmissionStatus('Submission failed.');
        }
    };

    if (loading) return <div className="p-8">Loading Tender...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!tender) return <div className="p-8 text-red-500">Tender not found.</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto flex gap-8">
            {/* Tender Details Section */}
            <div className="w-2/3">
                <h1 className="text-4xl font-bold mb-4 text-indigo-700">{tender.title}</h1>
                <p className="text-lg mb-6 text-gray-600">{tender.description}</p>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
                    <h2 className="text-2xl font-semibold mb-3">Key Information</h2>
                    <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleDateString()}</p>
                    {/* Placeholder for attachments */}
                    <p><strong>Attachments:</strong> Download Scope of Work.pdf</p> 
                </div>
            </div>

            {/* Proposal Submission Form Section (2a) */}
            <div className="w-1/3 p-6 bg-white border rounded-lg shadow-lg h-fit sticky top-4">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Submit Your Proposal</h2>

                <form onSubmit={handleProposalSubmit} className="space-y-4">
                    {/* Fields for Proposal Data */}
                    <textarea name="cover_letter" value={proposal.cover_letter} onChange={handleProposalChange} placeholder="Cover Letter" required rows="3" className="w-full p-2 border rounded-md"></textarea>
                    <textarea name="proposed_solution" value={proposal.proposed_solution} onChange={handleProposalChange} placeholder="Proposed Solution Summary" required rows="3" className="w-full p-2 border rounded-md"></textarea>
                    <input type="text" name="pricing" value={proposal.pricing} onChange={handleProposalChange} placeholder="Pricing (e.g., 150000.00)" required className="w-full p-2 border rounded-md" />

                    {submissionStatus && (
                        <p className={`text-sm ${submissionStatus.includes('successfully') ? 'text-green-600' : 'text-yellow-600'}`}>{submissionStatus}</p>
                    )}
                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition" disabled={submissionStatus.includes('Submitting')}>
                        Submit Proposal
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TenderDetails;