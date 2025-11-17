import { useState, useEffect } from 'react';
import { getTenderGuidelines } from '../../api/contentApi';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // NEW IMPORT

function Guidelines() {
    const [guidelines, setGuidelines] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuidelines = async () => {
            try {
                const data = await getTenderGuidelines();
                setGuidelines(data.content || 'No guidelines available yet.'); // Assuming 'content' field
            } catch (err) {
                setError(err.message || 'Failed to load guidelines.');
            } finally {
                setLoading(false);
            }
        };
        fetchGuidelines();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading guidelines...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <DashboardLinkButton /> {/* ADDED BUTTON HERE */}
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">Tender Creation Guidelines</h1>
            <div className="prose max-w-none"> {/* Using 'prose' for basic markdown styling if content is markdown */}
                {guidelines ? (
                    typeof guidelines === 'string' ? (
                        <p>{guidelines}</p> // Render as plain text
                    ) : (
                        // If guidelines is an object or structured data, you'd map over it
                        // For simplicity, assuming it's a string for now.
                        <div>
                            {/* Example for structured content: */}
                            {/* <h3>{guidelines.title}</h3>
                            <p>{guidelines.introduction}</p>
                            <ul>
                                {guidelines.sections.map((section, index) => (
                                    <li key={index}><strong>{section.heading}:</strong> {section.text}</li>
                                ))}
                            </ul> */}
                            <p>Here are some detailed guidelines to help you create effective tender requests. Follow these best practices to attract the best vendors and proposals.</p>
                            
                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">1. Clear and Concise Title</h2>
                            <p>Your tender title should clearly state the projects purpose. Avoid jargon and be specific. For example, instead of IT Project, use Development of an E-commerce Website with Payment Gateway Integration.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">2. Detailed Description</h2>
                            <p>Provide a comprehensive overview of the project, including its objectives, scope, key deliverables, and desired outcomes. The more details you provide, the better vendors can understand your needs and tailor their proposals.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">3. Specify Category/Industry</h2>
                            <p>Accurately categorize your tender to ensure it reaches relevant vendors. This helps in filtering and attracting specialists in the required field.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">4. Realistic Budget Range</h2>
                            <p>While optional, providing a budget range helps vendors determine if the project aligns with their pricing structures. It also helps manage expectations and can reduce time spent on unsuitable proposals.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">5. Strict Submission Deadline</h2>
                            <p>Set a clear and reasonable deadline. Ensure vendors have ample time to prepare a thorough proposal. Clearly communicate the date and time, including the time zone.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">6. Required Attachments</h2>
                            <p>If you have detailed Request for Proposal (RFP) documents, technical specifications, or design mockups, attach them. This provides vendors with all necessary information to submit accurate and competitive proposals.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">7. Clear Contact Information</h2>
                            <p>Provide a dedicated email address or contact person for inquiries. This ensures vendors can seek clarifications without issues, leading to better quality proposals.</p>

                            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">8. Evaluation Criteria</h2>
                            <p>Though not a field in the creation form, consider internally how you will evaluate proposals. Communicating this to vendors (e.g., in attachments) can help them focus their submissions on what matters most to you.</p>

                            <p className="mt-8 text-gray-600 italic">Following these guidelines will significantly improve the quality of proposals you receive and the success of your project.</p>
                        </div>
                    )
                ) : (
                    <p>No guidelines available yet.</p>
                )}
            </div>
        </div>
    );
}

export default Guidelines;