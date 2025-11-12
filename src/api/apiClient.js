// src/api/apiClient.js
const BASE_URL = "http://localhost:7000/api";

/**
 * Handles authenticated fetch requests.
 */
async function authenticatedFetch(endpoint, options = {}) {
    // FIX APPLIED HERE: Changed 'token' to 'authToken' to match AuthContext storage key
    const token = localStorage.getItem('authToken'); // Retrieve token stored during sign-in

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        // Attempt to parse error message from response body
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `API Error (${response.status})`);
    }

    // Handle No Content (204) responses
    if (response.status === 204) {
        return null;
    }
    
    return response.json();
}

export default authenticatedFetch;