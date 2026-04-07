import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const analyzeEmotion = async (userInput) => {
  const response = await axios.post(`${API_URL}/analyze-emotion`, { userInput });
  return response.data;
};

export const submitFeedback = async (data) => {
  const response = await axios.post(`${API_URL}/feedback`, data);
  return response.data;
};

export const getStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};

export const getDailyShlok = async () => {
  const response = await axios.get(`${API_URL}/daily-shlok`);
  return response.data;
};