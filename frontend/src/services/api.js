import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getContainers = async () => {
  try {
    const response = await api.get('/containers');
    return response.data;
  } catch (error) {
    console.error('Error fetching containers:', error);
    throw error;
  }
};

export const getContainerStats = async (containerId) => {
  try {
    const response = await api.get(`/stats/${containerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for container ${containerId}:`, error);
    throw error;
  }
};

export default api;
