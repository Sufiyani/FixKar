// src/utils/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  
  return data;
};

// Admin APIs
export const adminAPI = {
  login: async (name, password) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, password }),
    });
    return handleResponse(response);
  },

  refreshToken: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return handleResponse(response);
  },
};

// Vendor APIs
export const vendorAPI = {
  register: async (vendorData) => {
    const response = await fetch(`${API_BASE_URL}/vendors/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendorData),
    });
    return handleResponse(response);
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/vendors/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Add more vendor endpoints as needed
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/vendors/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProfile: async (updateData) => {
    const response = await fetch(`${API_BASE_URL}/vendors/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    return handleResponse(response);
  },
};

export default { adminAPI, vendorAPI };