// [Filename: src/api/tenderApi.js]

import api from './apiClient.js'; // Correct path based on file structure

const TENDER_URL = '/tenders';
const ADMIN_TENDER_URL = '/admin/tenders'; 

// =================================================================
// 1. TENDER LIST/FEED FUNCTIONS 
// =================================================================

export async function getTenders(params) {
    try {
        const response = await api.get(`${TENDER_URL}/search`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching filtered tenders:", error);
        throw error;
    }
}

export async function getActiveTendersFeed() {
    try {
        const response = await api.get(TENDER_URL, { params: { status: 'active' } });
        return response.data;
    } catch (error) {
        console.error("Error fetching active tender feed:", error);
        throw error;
    }
}

export async function getAllTendersAdmin(params = {}) {
    try {
        const response = await api.get(ADMIN_TENDER_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching all tenders (Admin):", error);
        throw error;
    }
}


// =================================================================
// 2. CRUD & DETAIL FETCHING FUNCTIONS
// =================================================================

export async function getTenderDetails(tenderId) {
    try {
        const response = await api.get(`${TENDER_URL}/${tenderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tender details ${tenderId}:`, error);
        throw error;
    }
}

export async function getTenderById(tenderId) {
    try {
        const response = await api.get(`${TENDER_URL}/${tenderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching tender by ID ${tenderId}:`, error);
        throw error;
    }
}

export async function createTender(tenderData) {
    try {
        const response = await api.post(TENDER_URL, tenderData);
        return response.data;
    } catch (error) {
        console.error("Error creating tender:", error);
        throw error;
    }
}

export async function updateTender(tenderId, tenderData) {
    try {
        const response = await api.patch(`${TENDER_URL}/${tenderId}`, tenderData); 
        return response.data;
    } catch (error) {
        console.error(`Error updating tender ${tenderId}:`, error);
        throw error;
    }
}

export async function getMyTenders(params = {}) {
    try {
        const response = await api.get(`${TENDER_URL}/mine`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching user's tenders:", error);
        throw error;
    }
}

// =================================================================
// 3. STATUS & DEADLINE MANAGEMENT FUNCTIONS
// =================================================================

/**
 * Allows an administrator to approve, reject, or suspend a tender.
 * This resolves the "does not provide an export named 'moderateTenderAdmin'" error.
 * @param {string} tenderId
 * @param {object} moderationData - E.g., { status: 'approved', reason: '...' }
 */
export async function moderateTenderAdmin(tenderId, moderationData) {
    try {
        // Assuming the moderation endpoint is specific to admin and takes PATCH
        const response = await api.patch(`${ADMIN_TENDER_URL}/${tenderId}/moderate`, moderationData); 
        return response.data;
    } catch (error) {
        console.error(`Error moderating tender ${tenderId}:`, error);
        throw error;
    }
}


export async function publishTender(tenderId) {
    try {
        const response = await api.patch(`${TENDER_URL}/${tenderId}/publish`);
        return response.data;
    } catch (error) {
        console.error(`Error publishing tender ${tenderId}:`, error);
        throw error;
    }
}

export async function deleteTender(tenderId) {
    try {
        const response = await api.delete(`${TENDER_URL}/${tenderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting tender ${tenderId}:`, error);
        throw error;
    }
}

export async function deleteTenderAdmin(tenderId) {
    try {
        const response = await api.delete(`${ADMIN_TENDER_URL}/${tenderId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting tender (Admin) ${tenderId}:`, error);
        throw error;
    }
}


export async function archiveTender(tenderId) {
    try {
        const response = await api.patch(`${TENDER_URL}/${tenderId}/archive`);
        return response.data;
    } catch (error) {
        console.error(`Error archiving tender ${tenderId}:`, error);
        throw error;
    }
}

export async function closeTender(tenderId) {
    try {
        const response = await api.patch(`${TENDER_URL}/${tenderId}/close`);
        return response.data;
    } catch (error) {
        console.error(`Error closing tender ${tenderId}:`, error);
        throw error;
    }
}

export async function extendTenderDeadline(tenderId, newDeadline) {
    try {
        const response = await api.patch(`${TENDER_URL}/${tenderId}/extend-deadline`, {
            deadline: newDeadline
        });
        return response.data;
    } catch (error) {
        console.error(`Error extending deadline for tender ${tenderId}:`, error);
        throw error;
    }
}