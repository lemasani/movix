import axiosClient from "./axios";


export const getTrending = async (mediaType: string) => {

  try {
    const response = await axiosClient.get(`trending/${mediaType}/week`);
    return response.data.results;
    
  } catch (error) {
    console.log(`error fetching trending ${mediaType}: `, error)
  }
};