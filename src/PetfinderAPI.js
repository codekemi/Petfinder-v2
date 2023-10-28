import React from "react";

const PetfinderAPI = () => {
  // Access the environment variables
  const apiKey = process.env.REACT_APP_PETFINDER_KEY;
  const apiSecret = process.env.REACT_APP_PETFINDER_SECRET;

  // Just for demonstration purposes, let's display the keys.
  // NOTE: In a real application, you should NEVER render API keys in the UI.
  return (
    <div>
      <h1>Petfinder API Component</h1>
      <p>API Key: {apiKey}</p>
      <p>API Secret: {apiSecret}</p>
    </div>
  );
};

export default PetfinderAPI;
