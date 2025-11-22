
// src/api/notificationApi.js
import authenticatedFetch from './apiClient';

/**
 * Fetches notifications for the authenticated user (Client or Vendor).
 * API: GET /api/notifications/my
 */
export const getMyNotifications = async () => {
    return authenticatedFetch('/notifications/my');
};

/**
 * Marks a specific notification as read.
 * API: PATCH /api/notifications/mark-read/:id
 */
export const markNotificationAsRead = async (notificationId) => {
    // Implementing the requested endpoint structure: /api/notifications/mark-read/0
    return authenticatedFetch(`/notifications/mark-read/${notificationId}`, {
        method: 'PATCH',
    });
};

/**
 * Fetches the count of unread notifications for the authenticated user.
 * API: GET /api/notifications/unread-count
 */
export const getUnreadNotificationCount = async () => {
    return authenticatedFetch('/notifications/unread-count');
};

/**
 * Marks ALL notifications for the authenticated user as read.
 * API: PATCH /api/notifications/mark-all-read
 */
export const markAllNotificationsAsRead = async () => {
    return authenticatedFetch('/notifications/mark-all-read', {
        method: 'PATCH',
    });
};
