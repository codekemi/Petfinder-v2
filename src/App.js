import React, { useEffect } from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import { getToken } from "./AuthService";

function App() {
  useEffect(() => {
    async function initializeToken() {
      try {
        const newToken = await getToken();
        // Store this token somewhere, possibly in a state,
        // or even better, in a global context or global state management like Redux.
        // For now, let's just log it to verify:
        console.log("Fetched Token:", newToken);
      } catch (error) {
        console.error("Error initializing token:", error);
      }
    }

    initializeToken();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <LandingPage />
      </header>
    </div>
  );
}

export default App;
