// src/api/taxonomyApi.js
import authenticatedFetch from './apiClient';

// ===================================
// --- ADMIN Taxonomy Management Functions (NEW) ---
// ===================================

// 13. Allow Admins to view platform taxonomies (Categories/Industries)
// API: GET /api/admin/taxonomy
export const getTaxonomiesAdmin = async () => {
    return authenticatedFetch('/admin/taxonomy');
};

// 10. Allow Admins to create categories, industries, and other platform taxonomies.
// API: POST /api/admin/taxonomy
export const createTaxonomy = async (taxonomyData) => {
    // taxonomyData might include { type: 'category', name: 'IT' }
    return authenticatedFetch('/admin/taxonomy', {
        method: 'POST',
        body: JSON.stringify(taxonomyData),
    });
};

// 11. Allow Admins to edit categories, industries, and other platform taxonomies.
// API: PUT /api/admin/taxonomy/:id
export const updateTaxonomy = async (taxonomyId, taxonomyData) => {
    return authenticatedFetch(`/admin/taxonomy/${taxonomyId}`, {
        method: 'PUT',
        body: JSON.stringify(taxonomyData),
    });
};

// 12. Allow Admins to delete categories, industries, and other platform taxonomies.
// API: DELETE /api/admin/taxonomy/:id
export const deleteTaxonomy = async (taxonomyId) => {
    return authenticatedFetch(`/admin/taxonomy/${taxonomyId}`, {
        method: 'DELETE',
    });
};