// src/api/notificationApi.js
import authenticatedFetch from './apiClient';

/**
 * Fetches notifications for the authenticated client.
 * Assumes a backend endpoint like GET /api/notifications/my exists.
 */
export const getMyNotifications = async () => {
    return authenticatedFetch('/notifications/my');
};

/**
 * Marks a specific notification as read.
 * Assumes a backend endpoint like PATCH /api/notifications/:id/read exists.
 */
export const markNotificationAsRead = async (notificationId) => {
    return authenticatedFetch(`/notifications/${notificationId}/read`, {
        method: 'PATCH',
    });
};