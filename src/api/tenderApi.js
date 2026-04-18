// src/api/tenderApi.js
import authenticatedFetch from './apiClient';

// =======================================================
// VENDOR API ENDPOINTS (Requirements 1a & 1b)
// =======================================================

// 1a) Search and Filter Tenders
// API: /api/tenders/search?keywords=... (Handles all query params)
export const getTenders = (params = {}) => {
    // Filter out undefined/null/empty string values for cleaner query params
    const cleanParams = Object.keys(params).reduce((acc, key) => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            acc[key] = params[key];
        }
        return acc;
    }, {});
    
    const query = new URLSearchParams(cleanParams).toString();
    return authenticatedFetch(`/tenders/search?${query}`);
};

// 1b) View full details of a public tender
// API: /api/tenders/{{tenderId}}
export const getTenderDetails = (tenderId) => {
    return authenticatedFetch(`/tenders/${tenderId}`);
};



// 1a) Create Tender (Draft/Save)
export const createTender = (tenderData) => {
    return authenticatedFetch('/tenders', {
        method: 'POST',
        body: JSON.stringify(tenderData),
    });
};

// 1a) Publish Tender
export const publishTender = (tenderId) => {
    return authenticatedFetch(`/tenders/${tenderId}/publish`, {
        method: 'PATCH', 
    });
};

// 1b) View Client Tenders (Dashboard)
export const getMyTenders = () => {
    return authenticatedFetch('/tenders/my-tenders');
};

// Fetch single tender (Useful for editing forms - functionally overlaps getTenderDetails)
export const getTenderById = (tenderId) => {
    return authenticatedFetch(`/tenders/${tenderId}`);
};

// 1c) Edit Tender (Drafted or Active)
export const updateTender = (tenderId, updateData) => {
    return authenticatedFetch(`/tenders/${tenderId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
    });
};

// 1d) Extend Deadline
export const extendTenderDeadline = (tenderId, newDeadline) => {
    return authenticatedFetch(`/tenders/${tenderId}/extend-deadline`, {
        method: 'PATCH',
        body: JSON.stringify({ new_deadline: newDeadline }),
    });
};

// 1e) Close Tender
export const closeTender = (tenderId) => {
    return authenticatedFetch(`/tenders/${tenderId}/close`, {
        method: 'PATCH', 
    });
};

// 1f) Archive Tender
export const archiveTender = (tenderId) => {
    return authenticatedFetch(`/tenders/${tenderId}/archive`, {
        method: 'PATCH', 
    });
};

// 1g) Delete Tender
export const deleteTender = (tenderId) => {
    return authenticatedFetch(`/tenders/${tenderId}`, {
        method: 'DELETE',
    });
};


// =======================================================
// ADMIN Tender Management Functions (NEW)
// =======================================================

// 1. View all tenders on the platform. (Req 2)
// API: GET http://localhost:7000/api/tenders/admin/all
export const getAllTendersAdmin = () => {
    return authenticatedFetch('/tenders/admin/all');
};

// 2. Admins to view specific tender.
// Note: We reuse getTenderDetails/getTenderById, relying on the backend to grant Admin access.

// 3. Moderate, approve, or reject tenders. (Req 3)
// API: PUT http://localhost:7000/api/tenders/admin/:id/moderate
export const moderateTenderAdmin = (tenderId, moderationData) => {
    // moderationData should contain { status: 'approved' | 'rejected', reason: '...' }
    return authenticatedFetch(`/tenders/admin/${tenderId}/moderate`, {
        method: 'PUT',
        body: JSON.stringify(moderationData),
    });
};

// 4. Edit tender. (Req 4 - part 1)
// API: PUT http://localhost:7000/api/tenders/admin/:id 
export const updateTenderAdmin = (tenderId, tenderData) => {
    return authenticatedFetch(`/tenders/admin/${tenderId}`, {
        method: 'PUT',
        body: JSON.stringify(tenderData),
    });
};

// 5. Delete tender. (Req 4 - part 2)
// API: DELETE http://localhost:7000/api/tenders/admin/:id
export const deleteTenderAdmin = (tenderId) => {
    return authenticatedFetch(`/tenders/admin/${tenderId}`, {
        method: 'DELETE',
    });
};