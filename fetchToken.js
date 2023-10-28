const fetch = require("node-fetch");

const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with your client ID
const CLIENT_SECRET = "YOUR_CLIENT_SECRET"; // Replace with your client secret

async function fetchAccessToken() {
  const tokenURL = "https://api.petfinder.com/v2/oauth2/token";

  const response = await fetch(tokenURL, {
    method: "POST",
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();

  if (data.access_token) {
    console.log("Access Token:", data.access_token);
    return data.access_token;
  } else {
    console.error("Error obtaining access token:", data);
    throw new Error(data.error_description || "Unknown error");
  }
}

fetchAccessToken();
