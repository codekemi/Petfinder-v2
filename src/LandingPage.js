import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { fetchToken } from "./services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchPets } from "./PetService";
import "./LandingPage.css";

function Header() {
  return (
    <header className="header">
      <div className="branding">Humane Society</div>
      <nav className="navigation">
        {/* Example links */}
        {/*  <a href="#">About Us</a>
        <a href="#">Programs</a>
        <a href="#">Services</a> */}
        {/* ... other links ... */}
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </header>
  );
}

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // ... other settings
  };

  return (
    <Slider {...settings}>
      {/* Example slides */}
      <div>
        <img src="/catdog.jpg" alt="Dog and Cat together" />
      </div>
      <div>
        <img src="/goldencat.jpg" alt="Golden Retreiver and Cat" />
      </div>
      <div>
        <img src="/puppy.jpg" alt="Puppy on the grass" />
      </div>
      <div>
        <img src="/sleepycat.jpg" alt="Sleepy Orange Cat" />
      </div>
      <div>
        <img src="/kitten.jpg" alt="Kitten" />
      </div>
      {/* ... other slides ... */}
    </Slider>
  );
}

function AdoptSection({ pets }) {
  return (
    <section className="adopt-section">
      <h2>Adopt Your New Best Friend!</h2>
      <div className="pets-list">
        {pets.map((pet) => (
          <div className="pet-item" key={pet.id}>
            <img src={pet.photos[0]?.medium} alt={pet.name} />
            <h3>{pet.name}</h3>
            {/* ... other pet details ... */}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <button>Adopt</button>
      <button>Volunteer</button>
      <button>Donate</button>
    </section>
  );
}

function LandingPage() {
  const [pets, setPets] = useState([]);
  const [token, setToken] = useState(""); // Store the token
  const [zipCode, setZipCode] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetchedToken = await fetchToken();
      setToken(fetchedToken);
      getPets(); // Fetch pets on initial load (optional)
    }

    fetchData();
  }, []);

  // Fetching pets when the component mounts (optional)
  useEffect(() => {
    const fetchInitialPets = async () => {
      try {
        const response = await axios.get(
          "https://api.petfinder.com/v2/animals"
        );
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchInitialPets();
  }, []);

  const getPets = useCallback(async () => {
    try {
      const fetchedPets = await fetchPets("dog", zipCode, distance, token); // Assuming you're searching for dogs. Modify the "type" argument as needed.
      setPets(fetchedPets);
    } catch (error) {
      console.error("Error getting pets:", error);
    }
  }, [zipCode, distance, token]);

  useEffect(() => {
    async function fetchData() {
      const fetchedToken = await fetchToken();
      setToken(fetchedToken);
      getPets(); // Fetch pets on initial load (optional)
    }

    fetchData();
  }, [getPets]);

  return (
    <div className="landing-container">
      <Header />
      <ImageSlider />

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Zip Code..."
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Distance..."
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <button onClick={getPets}>Search</button>{" "}
        {/* Call getPets function when the search button is clicked */}
      </div>

      <AdoptSection pets={pets} />
      <CTASection />
    </div>
  );
}

export default LandingPage;
