import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTender } from '../../api/tenderApi';
import DashboardLinkButton from '../../components/DashboardLinkButton'; // NEW IMPORT

const initialTenderState = {
    title: '',
    description: '',
    category: '',
    budget_range: '',
    deadline: '',
    location: '',
    contact_info: '',
    // client_id is usually handled by the backend from the authenticated token
};

function CreateTender() {
    const [formData, setFormData] = useState(initialTenderState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (actionType) => { // Renamed 'status' to 'actionType' for clarity
        setLoading(true);
        setError(null);

        // Basic validation check
        if (!formData.title || !formData.deadline) {
            setError("Title and Deadline are required fields.");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...formData,
                // Set the initial status based on the actionType
                status: actionType === 'publish' ? 'active' : 'draft',
                // Note: Attachments handling is skipped for simplicity but should be managed here.
                attachments: [],
            };

            // MODIFICATION: Removed 'const newTender =' as the variable is not used.
            await createTender(payload); // Call createTender once

            if (actionType === 'publish') {
                alert('Tender published successfully!');
            } else { // actionType is 'draft'
                alert('Tender saved as draft successfully!');
            }

            // Redirect to the client's tender list or the new tender's detail page
            navigate('/client/tenders');
        } catch (err) {
            // Check if err is an object and has a message property, otherwise default
            setError(err.message || 'Failed to process tender.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <DashboardLinkButton /> {/* ADDED BUTTON HERE */}
            <h1 className="text-3xl font-bold mb-6 text-indigo-600">Create New Tender</h1>

            {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

            <form className="space-y-4">
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Tender Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Detailed Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-md"
                />

                {/* Category & Budget */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category (e.g., Web Development)"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="budget_range"
                        placeholder="Budget Range (e.g., 10000-15000)"
                        value={formData.budget_range}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Deadline & Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                        <input
                            type="datetime-local"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="p-3 mt-5 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Contact Info */}
                <input
                    type="email"
                    name="contact_info"
                    placeholder="Contact Email"
                    value={formData.contact_info}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                />

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => handleSubmit('draft')}
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSubmit('publish')}
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Publishing...' : 'Publish Tender'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateTender;