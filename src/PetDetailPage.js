import React, { useEffect, useState } from "react";
import axios from "axios"; // If you're using axios
import { useParams } from "react-router-dom";
import "./PetDetailPage.css";

function PetDetailPage() {
  const { id } = useParams(); // Gets the pet's ID from the URL
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.petfinder.com/v2/animals${id}`
        );
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div>
      {/* Display the detailed pet info here */}
      <h2>{pet.name}</h2>
      {pet.photos[0] && <img src={pet.photos[0].medium} alt={pet.name} />}
      <p>{pet.description}</p>
      <div className="compatibility">
        <h4>Compatibility:</h4>
        <p>
          <strong>Good with Kids:</strong>{" "}
          {pet.good_with_children ? "Yes" : "No"}
        </p>
        <p>
          <strong>Good with Dogs:</strong> {pet.good_with_dogs ? "Yes" : "No"}
        </p>
        <p>
          <strong>Good with Cats:</strong> {pet.good_with_cats ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}

export default PetDetailPage;
