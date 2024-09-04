import React from 'react';

function Flashcard({ term, definition, onDiscard }) {
  console.log("Flashcard props:", { term, definition }); // Debugging log

  return (
    <div className="flashcard">
      <h3>{term}</h3>
      <p>{definition}</p>
      <button onClick={onDiscard} style={{ marginTop: '10px' }} className="discardButton">
        Discard
      </button>
    </div>
  );
}

export default Flashcard;