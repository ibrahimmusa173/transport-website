// src/Pages/Client/Guidelines.jsx
import { useState, useEffect } from 'react';
import { getTenderGuidelines } from '../../api/contentApi';
import DashboardLinkButton from '../../components/DashboardLinkButton'; 

function Guidelines() {
    const [guidelineText, setGuidelineText] = useState(null); // Stores dynamic content string
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuidelines = async () => {
            try {
                let data = await getTenderGuidelines();
                
                let publishedGuideline = null;
                
                // 1. Handle array response (if multiple, find the published one)
                if (Array.isArray(data)) {
                    // Defensive filter: If the backend incorrectly sends drafts, only look for 'published' ones.
                    publishedGuideline = data.find(g => (g.status?.toLowerCase() === 'published' || !g.status));
                } else if (data && (data.status?.toLowerCase() === 'published' || !data.status)) {
                    // 2. Handle single object response (If status is explicitly published or status field is omitted, which implies published per Step 3A)
                    publishedGuideline = data;
                }

                // 3. Set content only if a valid, published guideline was found
                if (publishedGuideline && publishedGuideline.content) {
                    setGuidelineText(publishedGuideline.content); 
                } else {
                    setGuidelineText(''); 
                }

            } catch (err) {
                console.error(err);
                setError('Failed to load official guidelines. Please check if the backend API (/api/guidelines) is available.');
                setGuidelineText(''); 
            } finally {
                setLoading(false);
            }
        };
        fetchGuidelines();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading guidelines...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    const showDynamicContent = guidelineText;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <DashboardLinkButton /> 
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">Tender Creation Guidelines</h1>
            <div className="prose max-w-none">
                {guidelineText !== null ? (
                    showDynamicContent ? (
                        <p className="whitespace-pre-wrap text-gray-700">{guidelineText}</p>
                    ) : (
                        <p className="text-gray-500">No official guidelines have been published yet by the Administrator.</p>
                    )
                ) : (
                    // Fallback should typically not happen after the useEffect logic, but kept for robustness.
                    <div>
                        <p className="text-gray-500">Default fallback content is displayed because no dynamic content was found or the API failed to load the data structure.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Guidelines;