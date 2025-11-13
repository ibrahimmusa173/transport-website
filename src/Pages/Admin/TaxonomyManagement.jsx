// src/Pages/Admin/TaxonomyManagement.jsx

import { useEffect, useState } from 'react';
import { getTaxonomiesAdmin, createTaxonomy, updateTaxonomy, deleteTaxonomy } from '../../api/taxonomyApi'; 

function TaxonomyManagement() {
    const [taxonomies, setTaxonomies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    
    // State for the new item form
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState('category'); // Default to category

    const fetchTaxonomies = async () => {
        setLoading(true);
        try {
            const data = await getTaxonomiesAdmin(); // Req 13
            setTaxonomies(data);
        } catch (error) {
            console.error("Failed to fetch taxonomies:", error);
            setStatusMessage({ message: 'Failed to load taxonomies. Check API logs.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaxonomies();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        setStatusMessage({ message: 'Creating taxonomy...', type: 'info' });
        try {
            await createTaxonomy({ name: newName, type: newType }); // Req 10
            setStatusMessage({ message: `${newType} created successfully.`, type: 'success' });
            setNewName('');
            await fetchTaxonomies();
        } catch (error) {
            console.error("Creation failed:", error);
            setStatusMessage({ message: error.message || 'Failed to create taxonomy.', type: 'error' });
        }
    };
    
    const handleUpdate = async (taxonomyId, currentName) => {
        const updatedName = prompt(`Enter new name for ${currentName}:`, currentName);
        if (updatedName && updatedName.trim() !== currentName) {
            setStatusMessage({ message: 'Updating taxonomy...', type: 'info' });
            try {
                await updateTaxonomy(taxonomyId, { name: updatedName }); // Req 11
                setStatusMessage({ message: 'Taxonomy updated successfully.', type: 'success' });
                await fetchTaxonomies();
            } catch (error) {
                console.error("Update failed:", error);
                setStatusMessage({ message: error.message || 'Failed to update taxonomy.', type: 'error' });
            }
        }
    };

    const handleDelete = async (taxonomyId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        setStatusMessage({ message: 'Deleting taxonomy...', type: 'info' });
        try {
            await deleteTaxonomy(taxonomyId); // Req 12
            setStatusMessage({ message: 'Taxonomy deleted successfully.', type: 'success' });
            await fetchTaxonomies();
        } catch (error) {
            console.error("Delete failed:", error);
            setStatusMessage({ message: error.message || 'Failed to delete taxonomy.', type: 'error' });
        }
    };

    if (loading) return <div className="p-8">Loading Taxonomy Management...</div>;

    // Group taxonomies by type for display
    const groupedTaxonomies = taxonomies.reduce((acc, tax) => {
        const type = tax.type || 'other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(tax);
        return acc;
    }, {});


    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-cyan-700">Admin: Taxonomy Management</h1>
            <p className="mb-6 text-gray-600">Manage categories, industries, and other classification items used on the platform.</p>

            {statusMessage.message && (
                <div className={`p-3 mb-4 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {statusMessage.message}
                </div>
            )}
            
            {/* Creation Form (Req 10) */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-400">
                 <h2 className="text-2xl font-semibold mb-4 text-blue-800">Create New Taxonomy Item</h2>
                <form onSubmit={handleCreate} className="flex space-x-4 items-end">
                    <div className="flex-grow">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                         <select
                            id="type"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                         >
                            <option value="category">Category</option>
                            <option value="industry">Industry</option>
                            <option value="skill">Skill</option>
                         </select>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 h-[42px]"
                    >
                        Create
                    </button>
                </form>
            </div>

            {/* Display Existing Taxonomies (Req 13) */}
            {Object.keys(groupedTaxonomies).length === 0 ? (
                 <p className="text-gray-600">No taxonomies defined yet.</p>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedTaxonomies).map(([type, items]) => (
                        <div key={type}>
                            <h2 className="text-2xl font-semibold mb-3 capitalize text-gray-800 border-b pb-2">{type} ({items.length})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {items.map((item) => (
                                    <div key={item._id || item.id} className="p-3 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                                        <span className="text-lg text-gray-700">{item.name}</span>
                                        <div className="space-x-2">
                                            <button 
                                                onClick={() => handleUpdate(item._id || item.id, item.name)}
                                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Edit (Req 11)
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item._id || item.id)}
                                                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Delete (Req 12)
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaxonomyManagement;