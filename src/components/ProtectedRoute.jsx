import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // 1. Import PropTypes
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="text-center mt-20">Loading authentication state...</div>;
    }

    if (!isAuthenticated) {
        // Redirect non-authenticated users to the sign-in page
        return <Navigate to="/signin" replace />;
    }

    return children;
}

// 2. Add PropTypes validation
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;