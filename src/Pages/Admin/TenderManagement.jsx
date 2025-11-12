// src/Pages/Admin/TenderManagement.jsx
import { useEffect, useState } from 'react';
import { getAllTendersAdmin } from '../../api/tenderApi'; 

function TenderManagement() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenders = async () => {
            try {
                // Assuming getAllTendersAdmin now returns raw data (response.data from apiClient/fetch wrapper)
                const data = await getAllTendersAdmin();
                setTenders(data);
            } catch (error) {
                console.error("Failed to fetch tenders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTenders();
    }, []);

    if (loading) return <div className="p-8">Loading tenders...</div>;
    if (tenders.length === 0) return <div className="p-8">No tenders found for moderation.</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-green-700">Admin: Tender Management</h1>
            <p className="mb-6 text-gray-600">Review, approve, or reject pending Tenders.</p>
            
            <div className="space-y-4">
                {tenders.map((tender) => (
                    <div key={tender._id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <h2 className="text-xl font-semibold">{tender.title}</h2>
                        <p className="text-gray-500 text-sm">Status: <span className="font-medium text-blue-600">{tender.status}</span></p>
                        <p className="mt-2 text-gray-700">{tender.description ? tender.description.substring(0, 150) + '...' : 'No description.'}</p>
                        
                        {/* Example Moderation Buttons - To be implemented later */}
                        <div className="mt-4 space-x-2">
                            <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                            <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}
export default TenderManagement;