// src/Pages/Vendor/TenderDetails.jsx
import  { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTenderDetails } from '../../api/tenderApi';
import { submitProposal } from '../../api/proposalApi';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // Import the new component


function TenderDetails() {
    const { tenderId } = useParams();
    const [tender, setTender] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('');
    
    // State to hold text inputs
    const [proposal, setProposal] = useState({
        cover_letter: '',
        proposed_solution: '',
        pricing: '',
    });
    // State to hold files
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null); // Ref to clear the file input

    useEffect(() => {
        const fetchTender = async () => {
            try {
                const data = await getTenderDetails(tenderId);
                setTender(data);
            } catch (err) {
                setError('Failed to load tender details. It might be closed or unauthorized.');
            } finally {
                setLoading(false);
            }
        };
        fetchTender();
    }, [tenderId]);

    const handleProposalChange = (e) => {
        setProposal(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleFileChange = (e) => {
        // e.target.files is a FileList object
        setAttachments(Array.from(e.target.files));
    };

    const handleProposalSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('Submitting...');
        setError(null);
        
        // 1. Create FormData object (Requirement 3: Multi-part submission)
        const formData = new FormData();
        formData.append('tender_id', tenderId);
        formData.append('cover_letter', proposal.cover_letter);
        formData.append('proposed_solution', proposal.proposed_solution);
        formData.append('pricing', proposal.pricing); 

        // 2. Append attachments (Requirement 3: Attachments)
        attachments.forEach((file) => {
            formData.append('attachments', file); // 'attachments' must match backend field name
        });

        try {
            await submitProposal(formData); 
            setSubmissionStatus('Proposal submitted successfully!');
            
            // Reset form
            setProposal({ cover_letter: '', proposed_solution: '', pricing: '' });
            setAttachments([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear file input
            }

        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to submit proposal. Please check inputs and file sizes.');
            setSubmissionStatus('Submission failed.');
        }
    };
    
    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };


    if (loading) return <div className="p-8">Loading Tender...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!tender) return <div className="p-8 text-red-500">Tender not found.</div>;

    // Check if the tender is still active for submission
    const isTenderActive = tender.status?.toLowerCase() === 'active' && new Date(tender.deadline) > new Date();

    // Determine the reason if inactive (IMPROVED ERROR CLARITY)
    let inactiveReason = '';
    if (tender.status?.toLowerCase() !== 'active') {
        inactiveReason = `Status is '${tender.status}' (must be 'Active'). It may be Draft, Pending Review, or Closed.`;
    } else if (new Date(tender.deadline) <= new Date()) {
        inactiveReason = 'The submission deadline has passed.';
    }


    return (
        <div className="p-8 max-w-6xl mx-auto">
            <DashboardLinkButton /> {/* ADDED BUTTON */}

            <div className="flex gap-8">
                {/* Tender Details Section */}
                <div className="w-2/3">
                    <h1 className="text-4xl font-bold mb-4 text-indigo-700">{tender.title}</h1>
                    <p className="text-lg mb-6 text-gray-600 whitespace-pre-wrap">{tender.description}</p>
                    
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8 space-y-3">
                        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">Key Information</h2>
                        <p><strong>Status:</strong> <span className={`capitalize font-semibold ${isTenderActive ? 'text-green-600' : 'text-gray-500'}`}>{tender.status || 'Draft'}</span></p>
                        <p><strong>Budget:</strong> {formatCurrency(tender.budget)}</p>
                        <p><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleString()}</p>
                        
                        {/* Requirement 2: Contact Information displayed for active tenders */}
                        {isTenderActive && tender.client_contact_email && (
                            <p className="bg-yellow-100 p-2 rounded mt-4 border border-yellow-300 text-yellow-800">
                                <strong>Client Contact:</strong> {tender.client_contact_email} (Use this for queries)
                            </p>
                        )}
                        
                        {/* Attachments Display (Requirement 2) */}
                        {tender.attachments && tender.attachments.length > 0 ? (
                            <div>
                                <p className="font-semibold mt-3">Attachments:</p>
                                <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                                    {tender.attachments.map((att, index) => (
                                        <li key={index}>
                                            <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {att.filename || `Attachment ${index + 1}`}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No attachments provided by the client.</p>
                        )}
                    </div>
                </div>

                {/* Proposal Submission Form Section (Requirement 3) */}
                <div className="w-1/3 p-6 bg-white border rounded-lg shadow-2xl h-fit sticky top-4">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Submit Your Proposal</h2>

                    {!isTenderActive && (
                        <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-md">
                            <p className="font-semibold">This tender is closed or not currently accepting proposals.</p>
                            {inactiveReason && <p className="text-sm mt-1">{inactiveReason}</p>}
                        </div>
                    )}

                    <form onSubmit={handleProposalSubmit} className="space-y-4">
                        
                        {/* Cover Letter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cover Letter/Introduction *</label>
                            <textarea name="cover_letter" value={proposal.cover_letter} onChange={handleProposalChange} placeholder="A compelling introduction..." required rows="4" className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        
                        {/* Proposed Solution */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Proposed Solution *</label>
                            <textarea name="proposed_solution" value={proposal.proposed_solution} onChange={handleProposalChange} placeholder="Outline your solution..." required rows="4" className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                        </div>
                        
                        {/* Pricing */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pricing (e.g., 150000.00) *</label>
                            <input type="number" name="pricing" value={proposal.pricing} onChange={handleProposalChange} placeholder="150000.00" required className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        
                        {/* Attachments */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Attachments (Optional)</label>
                            <input 
                                type="file" 
                                name="attachments" 
                                ref={fileInputRef}
                                multiple 
                                onChange={handleFileChange} 
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                            />
                            {attachments.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">{attachments.length} file(s) ready to upload.</p>
                            )}
                        </div>


                        {submissionStatus && (
                            <p className={`text-sm p-2 rounded ${submissionStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{submissionStatus}</p>
                        )}
                        {error && <p className="text-sm p-2 bg-red-100 text-red-500 rounded-md">{error}</p>}

                        <button 
                            type="submit" 
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50" 
                            disabled={submissionStatus.includes('Submitting') || !isTenderActive}
                        >
                            Submit Proposal
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TenderDetails;