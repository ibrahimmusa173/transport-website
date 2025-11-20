// src/api/proposalApi.js
import authenticatedFetch from './apiClient';

// ===================================
// --- VENDOR Functionalities ---
// ===================================

// 1) Submit Proposal (Accepts FormData containing text fields and files)
// API: POST /api/proposals
export const submitProposal = (formData) => {
    // authenticatedFetch handles setting the body and headers for FormData
    return authenticatedFetch(`/proposals`, {
        method: 'POST',
        body: formData, 
    });
};

// 2a) View a dashboard of their submitted proposals
// API: GET /api/proposals/my-proposals
export const getMyProposals = () => {
    return authenticatedFetch(`/proposals/my-proposals`);
};

// 3) Withdraw Proposal
// API: PATCH /api/proposals/:proposalId/status
export const withdrawProposal = (proposalId) => {
    return authenticatedFetch(`/proposals/${proposalId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: "withdrawn" }),
    });
};


// ===================================
// --- CLIENT Functionalities ---
// ===================================

// 4) View proposals for a specific tender (Client)
// API: GET /api/proposals/tender/:id
export const getProposalsByTender = (tenderId) => {
    return authenticatedFetch(`/proposals/tender/${tenderId}`);
};

// 5 & 6) Update proposal status (Shortlist/Reject/Award)
// API: PATCH /api/proposals/:proposalId/status
export const updateProposalStatus = (proposalId, status) => {
    return authenticatedFetch(`/proposals/${proposalId}/status`, {
        method: 'PATCH', 
        body: JSON.stringify({ status }),
    });
};


// ===================================
// --- ADMIN Proposal Management Functions ---
// ===================================

// 8) The system shall allow Admins to view all proposals submitted on the platform.
// API: GET /api/proposals/admin/all
export const getAllProposalsAdmin = () => {
    return authenticatedFetch(`/proposals/admin/all`);
};

// 2. View Specific Proposals (for a given tender). (Req 6)
// Note: We use the same function as the Client access, relying on Admin privileges to fetch all data.
export const getProposalsForTenderAdmin = (tenderId) => {
    return getProposalsByTender(tenderId);
};