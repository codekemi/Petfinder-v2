import axios from "axios";

export const fetchPets = async (type, zipCode, distance, authToken) => {
  const ENDPOINT = `https://api.petfinder.com/v2/animals`; // replace with actual endpoint URL

  try {
    const response = await axios.get(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      // Add any other parameters you need for the API request
      params: {
        type,
        location: zipCode,
        distance,
        //... any other params
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};
