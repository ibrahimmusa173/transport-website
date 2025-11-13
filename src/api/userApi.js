// src/api/userApi.js

import authenticatedFetch from './apiClient';


export const getAllUsersAdmin = async () => {
    // Req 1a: /api/users
    return authenticatedFetch('/users');
};

// 2. View user by Id (Req 1b)
// API: http://localhost:7000/api/users/:id
export const getUserByIdAdmin = async (userId) => {
    return authenticatedFetch(`/users/${userId}`);
};

// 3. Manage/Update user accounts (Req 1c)
// API: http://localhost:7000/api/users/:id (PUT/PATCH)
export const updateUserAdmin = async (userId, userData) => {
    return authenticatedFetch(`/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
};

// 4. Delete User Account (Req 1d)
// API: http://localhost:7000/api/users/:id (DELETE)
export const deleteUserAdmin = async (userId) => {
    return authenticatedFetch(`/users/${userId}`, {
        method: 'DELETE',
    });
};

// 5. Update Basic User Profile (Existing/Unchanged)
// API: PATCH http://localhost:7000/api/users/profile
export const updateUserProfile = async (profileData) => {
    return authenticatedFetch('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
    });
};