// src/Pages/Admin/ContentManagement.jsx

import { useEffect, useState } from 'react';
import { getTenderGuidelines, createGuideline, updateGuideline, deleteGuideline } from '../../api/contentApi'; 

function ContentManagement() {
    const [guidelines, setGuidelines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentGuideline, setCurrentGuideline] = useState(null);
    const [formContent, setFormContent] = useState('');
    const [formTitle, setFormTitle] = useState('');
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

    const fetchGuidelines = async () => {
        setLoading(true);
        try {
            // Assuming the Admin fetch returns all guideline versions/documents
            const data = await getTenderGuidelines(); 
            const guidelinesArray = Array.isArray(data) ? data : (data ? [data] : []);
            setGuidelines(guidelinesArray);
        } catch (error) {
            console.error("Failed to fetch guidelines:", error);
            setStatusMessage({ message: 'Failed to load guidelines.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuidelines();
    }, []);

    const handleEdit = (guideline) => {
        setCurrentGuideline(guideline);
        setFormTitle(guideline.title || '');
        setFormContent(guideline.content || '');
        setIsEditing(true);
        setStatusMessage({ message: '', type: '' });
    };

    const handleCreateNew = () => {
        setCurrentGuideline(null);
        setFormTitle('');
        setFormContent('');
        setIsEditing(true);
        setStatusMessage({ message: '', type: '' });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const guidelineData = { title: formTitle, content: formContent, type: 'tender' }; 
        
        setStatusMessage({ message: 'Saving guideline...', type: 'info' });

        try {
            if (currentGuideline?._id) {
                await updateGuideline(currentGuideline._id, guidelineData); // Req 8
                setStatusMessage({ message: 'Guideline updated successfully!', type: 'success' });
            } else {
                await createGuideline(guidelineData); // Req 7
                setStatusMessage({ message: 'Guideline created successfully!', type: 'success' });
            }
            setIsEditing(false);
            await fetchGuidelines(); // Refresh list
        } catch (error) {
            console.error("Save failed:", error);
            setStatusMessage({ message: error.message || 'Failed to save guideline.', type: 'error' });
        }
    };
    
    const handleDelete = async (guidelineId) => {
        if (!window.confirm("Are you sure you want to delete this guideline?")) return;
        setStatusMessage({ message: 'Deleting guideline...', type: 'info' });
        try {
            await deleteGuideline(guidelineId); // Req 9
            setStatusMessage({ message: 'Guideline deleted successfully.', type: 'success' });
            await fetchGuidelines(); // Refresh list
        } catch (error) {
             console.error("Delete failed:", error);
            setStatusMessage({ message: error.message || 'Failed to delete guideline.', type: 'error' });
        }
    };

    if (loading) return <div className="p-8">Loading Content Management...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-orange-700">Admin: Content Management (Tender Guidelines)</h1>
            
            {statusMessage.message && (
                <div className={`p-3 mb-4 rounded text-sm ${statusMessage.type === 'error' ? 'bg-red-100 text-red-700' : statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {statusMessage.message}
                </div>
            )}

            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">{currentGuideline ? 'Edit Guideline' : 'Create New Guideline'}</h2>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content (Markdown/HTML Support)</label>
                            <textarea
                                id="content"
                                value={formContent}
                                onChange={(e) => setFormContent(e.target.value)}
                                rows="10"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            ></textarea>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Save Guideline
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <button
                        onClick={handleCreateNew}
                        className="px-4 py-2 mb-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Create New Guideline (Req 7)
                    </button>
                    
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Existing Guidelines</h2>
                    {guidelines.length === 0 ? (
                        <p className="text-gray-600">No guidelines currently defined.</p>
                    ) : (
                        <div className="space-y-4">
                            {guidelines.map((g) => (
                                <div key={g._id || g.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium">{g.title || 'Untitled Guideline'}</p>
                                        <p className="text-sm text-gray-500">Last updated: {new Date(g.updatedAt || g.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button 
                                            onClick={() => handleEdit(g)}
                                            className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit (Req 8)
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(g._id || g.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete (Req 9)
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ContentManagement;