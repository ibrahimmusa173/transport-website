// src/context/AuthContext.jsx (Corrected)

import PropTypes from "prop-types";
import { useState, useEffect, createContext, useContext } from 'react';
import { loginUser, fetchUserProfile, registerUser as apiRegisterUser } from '../api/auth';
// Import new function
import { updateUserProfile } from '../api/userApi'; 

// 1. Create and export the AuthContext object
export const AuthContext = createContext(null);

// 2. Define and export the custom hook for consuming the context
// All pages/components (Dashboard, SignIn, SignUp, ProtectedRoute) rely on this hook.
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    // 3. STATE DEFINITIONS (Fixes no-undef errors for state variables and setters)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper to store state and manage loading/error
    const handleAuthSuccess = (userData, newToken) => {
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
        setIsLoading(false);
        setError(null);
    };

    // Placeholder functions referenced in the return value
    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const data = await loginUser(credentials);
            handleAuthSuccess(data.user, data.token);
        } catch (err) {
            setError(err.message || 'Login failed');
            setIsLoading(false);
            throw err;
        }
    };

    const register = async (userData) => {
        setIsLoading(true);
        try {
            const data = await apiRegisterUser(userData);
            handleAuthSuccess(data.user, data.token);
        } catch (err) {
            setError(err.message || 'Registration failed');
            setIsLoading(false);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
    };

   // src/context/AuthContext.jsx (~ Line 65)

   // Effect to check token validity and fetch user profile
useEffect(() => {
    const loadUser = async () => {
        if (token) {
            try {
                const profile = await fetchUserProfile(token);
                // FIX 1: Ensure we extract the user object from the response payload
                setUser(profile.user || profile); 
                setError(null);
            } catch (err) {
                console.error("Token invalid or profile fetch failed:", err);
                logout(); // Log out on failure
            }
        }
        setIsLoading(false);
    };
    loadUser();
}, [token]);



// NEW: Function to update user profile
const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
        // 1. Send the update request
        await updateUserProfile(profileData);
        
        // FIX FOR STALE DATA: Immediately re-fetch the full user profile 
        // after the update to ensure state consistency.
        const newProfileData = await fetchUserProfile(token); 

        // 2. Set the complete, freshly fetched profile data
        setUser(newProfileData.user || newProfileData); 
        setError(null);
        return newProfileData;
    } catch (err) {
        setError(err.message || 'Failed to update profile.');
        throw err; // Re-throw so Dashboard component can handle UI error messages
    } finally {
        setIsLoading(false);
    }
};


return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, error, login, register, logout, updateProfile }}>
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