import axios from "axios";

const AUTH_URL = "https://api.petfinder.com/v2/oauth2/token";

export const getToken = async () => {
  try {
    const response = await axios.post(AUTH_URL, {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_PETFINDER_KEY,
      client_secret: process.env.REACT_APP_PETFINDER_SECRET,
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error);
  }
};
