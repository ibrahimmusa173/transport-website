// src/context/AuthContext.jsx (Corrected)

import PropTypes from "prop-types";
import { useState, useEffect, createContext, useContext } from 'react';
import { loginUser, fetchUserProfile, registerUser as apiRegisterUser } from '../api/auth';

// 1. Create and export the AuthContext object
export const AuthContext = createContext(null);

// 2. Define and export the custom hook for consuming the context
// All pages/components (Dashboard, SignIn, SignUp, ProtectedRoute) rely on this hook.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const profileData = await fetchUserProfile(token); 
                    // Handle the API potentially returning user details directly or wrapped in 'user' key
                    setUser(profileData.user || profileData);
                } catch (err) {
                    console.error("Token verification failed, logging out:", err);
                    logout();
                }
            }
            setIsLoading(false);
        };
        loadUser();
    }, [token]);

    const handleAuthSuccess = (data) => {
        const receivedToken = data.token;
        const receivedUser = data.user || data;

        if (receivedToken) {
            setToken(receivedToken);
            localStorage.setItem('authToken', receivedToken);
        }
        setUser(receivedUser);
        setError(null);
    };

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const data = await loginUser(credentials);
            handleAuthSuccess(data);
        } catch (err) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials) => {
        setIsLoading(true);
        try {
            const data = await apiRegisterUser(credentials); 
            // If the backend returns a token upon registration, use handleAuthSuccess
            // Otherwise, just return success data and rely on navigation to /signin
            if (data.token) handleAuthSuccess(data);
            return data;
        } catch (err) {
            setError(err.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, error, login, register, logout }}>
            {isLoading && token && !user ? (
                <div className="flex justify-center items-center h-screen text-xl">Loading...</div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};