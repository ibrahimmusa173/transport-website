// src/Pages/Vendor/TenderList.jsx
import  { useState, useEffect } from 'react';
import { getTenders } from '../../api/tenderApi'; 
import { Link } from 'react-router-dom';

function TenderList() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({ keywords: '' });

    const fetchTenders = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTenders(searchParams);
            setTenders(data);
        } catch (err) {
            setError('Failed to fetch tenders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search input in a real app, but for simplicity, we trigger on change
        fetchTenders();
    }, [searchParams]);

    const handleSearchChange = (e) => {
        setSearchParams({ keywords: e.target.value });
    };

    if (loading) return <div className="p-8">Loading Tenders...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-green-700">Explore Active Tenders</h1>
            
            <input
                type="text"
                placeholder="Search by keywords, category, or location..."
                className="w-full p-3 mb-6 border rounded-lg shadow-sm"
                value={searchParams.keywords}
                onChange={handleSearchChange}
            />

            {tenders.length === 0 ? (
                <p className="text-lg text-gray-500">No active tenders found.</p>
            ) : (
                <div className="space-y-4">
                    {tenders.map((tender) => (
                        <div key={tender.tender_id} className="p-5 border rounded-lg shadow-md bg-white">
                            <h2 className="text-xl font-semibold text-gray-800">{tender.title}</h2>
                            <p className="text-gray-700 truncate">{tender.description}</p>
                            <div className="mt-3 flex justify-between items-center">
                                <span className="text-sm font-medium text-indigo-600">
                                    Deadline: {new Date(tender.deadline).toLocaleDateString()}
                                </span>
                                <Link 
                                    to={`/vendor/tenders/${tender.tender_id}`}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    View Details & Propose
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TenderList;