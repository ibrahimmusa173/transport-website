// src/api/contentApi.js
import authenticatedFetch from './apiClient';

/**
 * Fetches tender guidelines (Client Read - Step 3A).
 * API: GET /api/guidelines (Based on Step 3 Requirement)
 * NOTE: The backend must ensure this endpoint only returns published content.
 */
export const getTenderGuidelines = async () => {
    return authenticatedFetch('/guidelines');
};

// NEW: Admin function to get all guidelines (Req 7-9 management needs a list/collection access, Step 2B)
// API: GET /api/admin/content/guidelines
export const getAllGuidelinesAdmin = async () => {
    return authenticatedFetch('/admin/content/guidelines');
};

// ===================================
// --- ADMIN Guidelines Management Functions (NEW) ---
// ===================================

// 7. Admins to create guidelines (Step 2A)
// API: POST /api/admin/content/guidelines
export const createGuideline = async (guidelineData) => {
    return authenticatedFetch('/admin/content/guidelines', {
        method: 'POST',
        body: JSON.stringify(guidelineData),
    });
};

// 8. Admins to Edit guidelines (Step 2C)
// API: PUT /api/admin/content/guidelines/:id
export const updateGuideline = async (guidelineId, guidelineData) => {
    return authenticatedFetch(`/admin/content/guidelines/${guidelineId}`, {
        method: 'PUT',
        body: JSON.stringify(guidelineData),
    });
};

// 9. Admins to Delete guidelines (Step 2D)
// API: DELETE /api/admin/content/guidelines/:id
export const deleteGuideline = async (guidelineId) => {
    return authenticatedFetch(`/admin/content/guidelines/${guidelineId}`, {
        method: 'DELETE',
    });
};