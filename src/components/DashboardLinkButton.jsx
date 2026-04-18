// src/components/DashboardLinkButton.jsx
import { Link } from 'react-router-dom';

function DashboardLinkButton() {
    return (
        <div className="mb-6 flex justify-start">
            <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 flex items-center text-sm font-medium"
            >
                {/* Home Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Go to Dashboard
            </Link>
        </div>
    );
}

export default DashboardLinkButton;