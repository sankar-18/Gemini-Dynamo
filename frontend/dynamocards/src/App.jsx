import React, { useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard.jsx';
import './Flashcard.css'

function App() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [keyConcepts, setKeyConcepts] = useState([]);
  const [error, setError] = useState("");

  const handleLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const sendLink = async () => {
    try {
      const response = await axios.post("http://localhost:8000/analyze_video", {
        youtube_link: youtubeLink,
      });

      const data = response.data;
      console.log("API Response:", data); // Debugging log

      if (data.key_concepts && Array.isArray(data.key_concepts)) {
        const transformedConcepts = data.key_concepts.map(concept => {
          const term = Object.keys(concept)[0];
          const definition = concept[term];
          return { term, definition };
        });
        setKeyConcepts(transformedConcepts);
        setError("");
      } else {
        console.error("Data does not contain key concepts: ", data);
        setKeyConcepts([]);
        setError("Failed to retrieve key concepts.");
      }
    } catch (error) {
      console.error("Error occurred while processing the link:", error); // Debugging log
      setKeyConcepts([]);
      setError("An error occurred while processing the link.");
    }
  };

  const discardFlashcard = (index) => {
    setKeyConcepts(currentConcepts => currentConcepts.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>YouTube Link to Flashcards Generator</h1>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Paste YouTube Link Here"
          value={youtubeLink}
          onChange={handleLinkChange}
          className="inputField"
        />
        <button onClick={sendLink}>
          Generate Flashcards
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="flashcardsContainer">
        {keyConcepts.map((concept, index) => (
          <Flashcard
            key={index}
            term={concept.term}
            definition={concept.definition}
            onDiscard={() => discardFlashcard(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;