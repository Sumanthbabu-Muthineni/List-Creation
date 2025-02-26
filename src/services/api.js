import axios from 'axios';

const API_URL = 'https://apis.ccbp.in/list-creation/lists';

export const fetchLists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.lists;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
