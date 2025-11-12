// src/api/proposalApi.js (MODIFIED to include Vendor and Admin endpoints)
import authenticatedFetch from './apiClient';

// ===================================
// --- VENDOR Functionalities ---
// ===================================

// 2a) Submit Proposal
// API: POST /api/proposals
export const submitProposal = (proposalData) => {
    return authenticatedFetch(`/proposals`, {
        method: 'POST',
        body: JSON.stringify(proposalData),
    });
};

// 2b) View a dashboard of their submitted proposals
// API: GET /api/proposals/my-proposals
export const getMyProposals = () => {
    return authenticatedFetch(`/proposals/my-proposals`);
};

// ===================================
// --- CLIENT Functionalities ---
// ===================================

// View proposals for a specific tender (Used by Client to review submissions)
export const getProposalsByTender = (tenderId) => {
    // API: GET /api/proposals/tender/:id
    return authenticatedFetch(`/proposals/tender/${tenderId}`);
};

export const updateProposalStatus = (proposalId, status) => {
    return authenticatedFetch(`/proposals/${proposalId}/status`, {
        method: 'PATCH', 
        body: JSON.stringify({ status }),
    });
};


// ===================================
// --- ADMIN Proposal Management Functions ---
// ===================================

// 1. The system shall allow Admins to view all proposals submitted on the platform.
// API: GET /api/proposals/admin/all
export const getAllProposalsAdmin = () => {
    return authenticatedFetch(`/proposals/admin/all`);
};

// 2. View Specific Proposals (for a given tender). 
// API: GET /api/proposals/tender/:id
// Note: We use the same function as the Client access, relying on Admin privileges to fetch all data.
export const getProposalsForTenderAdmin = (tenderId) => {
    return getProposalsByTender(tenderId);
};