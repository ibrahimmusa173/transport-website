// src/api/apiClient.js
const BASE_URL = "http://localhost:7000/api";

/**
 * Handles authenticated fetch requests, supporting JSON and FormData (for file uploads).
 */
async function authenticatedFetch(endpoint, options = {}) {
    const token = localStorage.getItem('authToken'); 

    const defaultHeaders = {};

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
    
    // Determine headers based on body type
    const requestHeaders = {
        ...defaultHeaders,
        ...options.headers,
    };
    
    // IMPORTANT: If the body is FormData (file upload), DO NOT set Content-Type header.
    // The browser automatically handles multipart/form-data boundary specification.
    if (!(options.body instanceof FormData)) {
        requestHeaders['Content-Type'] = 'application/json';
    } else if (requestHeaders['Content-Type']) {
        // Remove Content-Type if it was explicitly added but the body is FormData
        delete requestHeaders['Content-Type'];
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: requestHeaders,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message || `API Error (${response.status})`);
    }

    if (response.status === 204) {
        return null;
    }
    
    return response.json();
}

export default authenticatedFetch;