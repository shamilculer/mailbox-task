import ApiRequest from '../config/api.ts';

const fetchEmails = async () => {
  try {
    const response = await ApiRequest.get('/messages');
    return response.data.value;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  } 
};

export default fetchEmails;