import axios from "axios";

export const fetchToken = async () => {
  try {
    const response = await axios.post(
      "https://api.petfinder.com/v2/oauth2/token",
      null,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "client_credentials",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
      }
    );

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

// ... Add other API-related functions here ...
