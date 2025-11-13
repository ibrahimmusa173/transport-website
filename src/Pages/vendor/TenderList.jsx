// src/Pages/Vendor/TenderList.jsx
import  { useState, useEffect, useCallback } from 'react';
import { getTenders } from '../../api/tenderApi'; 
import { Link } from 'react-router-dom';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // Import the new component

function TenderList() {
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const initialSearchParams = {
        keywords: '',
        category: '',
        location: '',
        min_budget: '',
        max_budget: '',
        sort_by: 'created_at',
        order_by: 'DESC',
    };
    
    const [searchParams, setSearchParams] = useState(initialSearchParams);

    // Categories and Sorting Options (placeholders matching requirements)
    const categories = ['IT', 'Construction', 'Consulting', 'Services', 'Manufacturing'];
    const sortOptions = [
        { value: 'created_at', label: 'Posting Date' },
        { value: 'deadline', label: 'Deadline' },
        { value: 'budget', label: 'Budget' },
    ];


    const fetchTenders = useCallback(async (params) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTenders(params);
            setTenders(data);
        } catch (err) {
            // Updated error message to hint at network or backend issue
            setError('Failed to fetch active tenders. Check your network connection or the server status.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect to trigger fetch whenever searchParams change
    useEffect(() => {
        const handler = setTimeout(() => {
            fetchTenders(searchParams);
        }, 300); 

        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, fetchTenders]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };
    
    const handleClearFilters = () => {
        setSearchParams(initialSearchParams);
    };
    
    // Helper to format currency
    const formatCurrency = (amount) => {
        if (!amount) return 'N/A';
        return `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };


    if (loading) return <div className="p-8">Loading Active Tenders...</div>;
    if (error && error !== 'Failed to fetch active tenders. Ensure you are logged in.') return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <DashboardLinkButton /> {/* ADDED BUTTON */}
            
            <h1 className="text-3xl font-bold mb-6 text-green-700">Explore Active Tenders</h1>
            
            {/* Filtering and Search Controls (Requirement 1) */}
            <div className="bg-white p-6 mb-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Tender Filters</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    
                    {/* Keywords Search */}
                    <div className="md:col-span-3">
                        <input
                            type="text"
                            name="keywords"
                            placeholder="Search by keywords, title, or scope..."
                            className="w-full p-2 border rounded-md"
                            value={searchParams.keywords}
                            onChange={handleSearchChange}
                        />
                    </div>
                    
                    {/* Category Filter */}
                    <div>
                        <select 
                            name="category"
                            value={searchParams.category}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded-md bg-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="w-full p-2 border rounded-md"
                            value={searchParams.location}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Min Budget Filter */}
                    <div>
                        <input
                            type="number"
                            name="min_budget"
                            placeholder="Min Budget"
                            className="w-full p-2 border rounded-md"
                            value={searchParams.min_budget}
                            onChange={handleSearchChange}
                        />
                    </div>
                    
                    {/* Max Budget Filter */}
                    <div>
                        <input
                            type="number"
                            name="max_budget"
                            placeholder="Max Budget"
                            className="w-full p-2 border rounded-md"
                            value={searchParams.max_budget}
                            onChange={handleSearchChange}
                        />
                    </div>
                    
                    {/* Sorting Control */}
                    <div className='lg:col-span-3'>
                        <label className="text-sm text-gray-500 block">Sort By:</label>
                        <select 
                            name="sort_by"
                            value={searchParams.sort_by}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded-md bg-white"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Clear Filters Button */}
                    <div className="flex items-end lg:col-span-2">
                        <button
                            onClick={handleClearFilters}
                            className="w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                    
                </div>
            </div>


            {/* Tender Results */}
            {tenders.length === 0 ? (
                <p className="text-lg text-gray-500">No active tenders found matching your criteria.</p>
            ) : (
                <div className="space-y-4">
                    {tenders.map((tender) => {
                        const tenderIdentifier = tender.tender_id || tender.id;
                        if (!tenderIdentifier) return null; 

                        return (
                            <div key={tenderIdentifier} className="p-5 border rounded-xl shadow-md bg-white hover:shadow-lg transition duration-200">
                                <h2 className="text-2xl font-semibold text-indigo-700">{tender.title}</h2>
                                <p className="text-gray-700 mt-1 mb-2">
                                    {tender.category && <span className="text-sm text-purple-600 mr-3">{tender.category}</span>}
                                    {tender.location && <span className="text-sm text-gray-500">{tender.location}</span>}
                                </p>
                                <p className="text-gray-700 truncate">{tender.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <div>
                                        <span className="text-sm font-medium text-red-600 mr-4">
                                            Deadline: {new Date(tender.deadline).toLocaleDateString()}
                                        </span>
                                        {tender.budget && (
                                            <span className="text-sm font-bold text-green-700">
                                                Budget: {formatCurrency(tender.budget)}
                                            </span>
                                        )}
                                    </div>
                                    <Link 
                                        to={`/vendor/tenders/${tenderIdentifier}`} 
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        View Details & Propose
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

export default TenderList;