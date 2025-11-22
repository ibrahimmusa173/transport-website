
// src/api/contentApi.js
import authenticatedFetch from './apiClient';

/**
 * Fetches tender guidelines (Client Read).
 * This route should ideally be accessible to clients (non-admins) for reading.
 * Assumes a backend endpoint like GET /api/content/guidelines exists.
 */
export const getTenderGuidelines = async () => {
    return authenticatedFetch('/content/guidelines');
};

// NEW: Admin function to get all guidelines (Req 7-9 need a list/collection access)
// API: GET /api/admin/content/guidelines
export const getAllGuidelinesAdmin = async () => {
    return authenticatedFetch('/admin/content/guidelines');
};

// ===================================
// --- ADMIN Guidelines Management Functions (NEW) ---
// ===================================

// 7. Admins to create guidelines
// API: POST /api/admin/content/guidelines
export const createGuideline = async (guidelineData) => {
    return authenticatedFetch('/admin/content/guidelines', {
        method: 'POST',
        body: JSON.stringify(guidelineData),
    });
};

// 8. Admins to Edit guidelines
// API: PUT /api/admin/content/guidelines/:id
export const updateGuideline = async (guidelineId, guidelineData) => {
    return authenticatedFetch(`/admin/content/guidelines/${guidelineId}`, {
        method: 'PUT',
        body: JSON.stringify(guidelineData),
    });
};

// 9. Admins to Delete guidelines
// API: DELETE /api/admin/content/guidelines/:id
export const deleteGuideline = async (guidelineId) => {
    return authenticatedFetch(`/admin/content/guidelines/${guidelineId}`, {
        method: 'DELETE',
    });
};
