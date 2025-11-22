// src/api/notificationApi.js
import authenticatedFetch from './apiClient';

/**
 * [RETAINED for list display]
 * Fetches ALL notifications for the authenticated user (Client/Vendor).
 * Assumes backend endpoint is /notifications/my (required for dashboard list).
 */
export const getMyNotifications = async () => {
    return authenticatedFetch('/notifications');
};

/**
 * Fetches the count of unread notifications. (Based on user Req 1b)
 * API: GET /api/notifications/unread-count
 */
export const getUnreadNotificationCount = async () => {
    return authenticatedFetch('/notifications/unread-count');
};


/**
 * Marks a specific notification as read. (Based on user Req 1c)
 * API: PATCH /api/notifications/mark-read/:id
 */
export const markNotificationAsRead = async (notificationId) => {
    return authenticatedFetch(`/notifications/mark-read/${notificationId}`, {
        method: 'PATCH',
    });
};

/**
 * Marks all notifications as read for the current user. (Based on user Req 1d)
 * API: PATCH /api/notifications/mark-read/all
 */
export const markAllNotificationsAsRead = async () => {
    return authenticatedFetch('/notifications/mark-read/all', {
        method: 'PATCH',
    });
};