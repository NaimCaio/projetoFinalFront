import axios from 'axios';

const BASE_URL = 'https://deploy-node-in-vercel-7ptqjdfda-naimcaio.vercel.app'; // Replace with your API base URL

const ApiService = {
  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      console.error('Error making POST request:', error);
      throw error;
    }
  },

  get: async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      // Handle error here, e.g., log or throw an exception
      console.error('Error making GET request:', error);
      throw error;
    }
  },
  put: async (endpoint,data) => {
    try {
      const response = await axios.put(`${BASE_URL}/${endpoint}`,data);
      return response.data;
    } catch (error) {
      // Handle error here, e.g., log or throw an exception
      console.error('Error making GET request:', error);
      throw error;
    }
  },
  delete: async (endpoint) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      // Handle error here, e.g., log or throw an exception
      console.error('Error making GET request:', error);
      throw error;
    }
  }
};

export default ApiService;
