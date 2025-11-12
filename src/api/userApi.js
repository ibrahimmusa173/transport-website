// src/api/userApi.js

import apiClient from './apiClient';


export const getAllUsersAdmin = async () => {
    const response = await apiClient.get('/users');
    return response.data;
};

// 2. View user by Id
// API: http://localhost:7000/api/users/:id
export const getUserByIdAdmin = async (userId) => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
};

// 3. Manage/Update user accounts
// API: http://localhost:7000/api/users/:id (PUT/PATCH)
export const updateUserAdmin = async (userId, userData) => {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
};

// 4. Delete User Account
// API: http://localhost:7000/api/users/:id (DELETE)
export const deleteUserAdmin = async (userId) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
};