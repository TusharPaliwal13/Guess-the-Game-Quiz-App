import React, { useState, useEffect } from 'react';

function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset state when a new question comes in
  useEffect(() => {
    setSelected(null);
    setShowFeedback(false);
  }, [question]);

  const handleClick = (option) => {
    // Prevent multiple selections for the same question
    if (selected !== null) return;

    setSelected(option);
    setShowFeedback(true);

    // Determine if the selected option is correct
    const isCorrect = option === question.correct;

    // Delay calling onAnswer to allow feedback to be seen
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white mx-auto">
      {/* Game screenshot image */}
      <img
        src={question.image}
        alt="Game screenshot"
        className="rounded mb-6 w-full h-64 object-cover border border-gray-700"
        // Fallback for broken images
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/374151/D1D5DB?text=Image+Not+Found`; }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option) => {
          const isSelected = selected === option;
          let style = 'bg-gray-700 hover:bg-gray-600'; // Default style

          // Apply feedback styles after an option is selected
          if (selected !== null) {
            if (option === question.correct) {
              style = 'bg-green-500 ring-2 ring-green-300'; // Correct answer, with a ring
            } else if (isSelected && option !== question.correct) {
              style = 'bg-red-600 ring-2 ring-red-300'; // Incorrectly selected answer, with a ring
            } else {
              style = 'bg-gray-700 opacity-50 cursor-not-allowed'; // Unselected answers after choice
            }
          }

          return (
            <button
              key={option}
              className={`py-3 px-4 rounded text-lg transition duration-200 ${style} shadow-md`}
              onClick={() => handleClick(option)}
              disabled={selected !== null} // Disable buttons after an answer is selected
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback message - now cooler! */}
      {showFeedback && selected !== null && (
        <p className={`mt-6 text-center text-3xl font-extrabold transition-opacity duration-500 ease-in-out ${selected === question.correct ? 'text-green-300' : 'text-red-300'}`}>
          {selected === question.correct
            ? 'Awesome! You nailed it! 🎉'
            : `Oops! Not quite. It was: ${question.correct} 💡`}
        </p>
      )}
    </div>
  );
}

export default QuestionCard;
