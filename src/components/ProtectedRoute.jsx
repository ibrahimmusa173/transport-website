// src/components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; 
import PropTypes from 'prop-types'; // Import PropTypes

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-center mt-20">Loading authentication status...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Only authentication logic remains here.
    return (
        <main className="min-h-screen"> 
            {children}
        </main>
    );
}

// Add PropTypes validation
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;