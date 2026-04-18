// src/api/analyticsApi.js
import authenticatedFetch from './apiClient';

// ===================================
// --- ADMIN Analytics Functions (NEW) ---
// ===================================

// 14a. Dashboard overview (e.g., active users, tenders posted)
// API: GET /api/admin/analytics/dashboard
export const getAdminDashboardAnalytics = async () => {
    return authenticatedFetch('/admin/analytics/dashboard');
};

// 14b. User reporting
// API: GET /api/admin/analytics/user-report
export const getUserReport = async () => {
    return authenticatedFetch('/admin/analytics/user-report');
};

// 14c. Tender reporting
// API: GET /api/admin/analytics/tender-report
export const getTenderReport = async () => {
    return authenticatedFetch('/admin/analytics/tender-report');
};