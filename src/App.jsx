import React, { useState, useEffect, Fragment } from 'react'; // Import Fragment
import questions from './components/questions'; // Assuming this path is correct
import QuestionCard from './components/QuestionCard'; // Assuming this path is correct

function App() {
  // State to manage the current question index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track the user's score
  const [score, setScore] = useState(0);
  // State for the timer on each question
  const [timer, setTimer] = useState(10);
  // State to control whether the quiz has started or the landing page is shown
  const [hasStarted, setHasStarted] = useState(false);
  // State to store pre-generated styles for particles to ensure fixed initial positions
  const [particleData, setParticleData] = useState([]);

  // useEffect hook to generate particle styles only once on component mount
  useEffect(() => {
    const generatedData = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));
    setParticleData(generatedData);
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect hook for timer logic
  useEffect(() => {
    // Only run timer if the quiz has started and there are questions left
    if (!hasStarted || currentIndex >= questions.length) {
      return; // Stop timer if quiz hasn't started or is finished
    }

    // Set up an interval to decrement the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        // If timer reaches 1, move to the next question and reset timer
        if (prevTimer === 1) {
          setCurrentIndex((prev) => prev + 1);
          return 10; // Reset timer for the next question
        }
        // Otherwise, just decrement the timer
        return prevTimer - 1;
      });
    }, 1000); // Interval of 1 second

    // Cleanup function to clear the interval when the component unmounts
    // or when currentIndex/hasStarted changes
    return () => clearInterval(interval);
  }, [currentIndex, hasStarted]); // Dependencies: re-run effect if currentIndex or hasStarted changes

  // Function to handle answer selection
  const handleAnswer = (isCorrect) => {
    // If the answer is correct, increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
    // Move to the next question
    setCurrentIndex(currentIndex + 1);
    // Reset the timer for the new question
    setTimer(10);
  };

  // Render the landing page if the quiz hasn't started
  if (!hasStarted) {
    return (
      <Fragment> {/* Use Fragment as the root to allow multiple top-level elements */}
        {/* Tailwind CSS CDN for styling */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Coolvetica Font */}
        <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet" />
        <style>
          {`
            @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
            body {
              font-family: 'Coolvetica', sans-serif;
              overflow: hidden; /* Prevent scrollbar due to animation */
            }
            /* Keyframes for the particle floating animation, including centering */
            @keyframes particleMove {
              0% { transform: translate(-50%, -50%) translate(0px, 0px); }
              100% { transform: translate(-50%, -50%) translate(20px, 20px); }
            }
            .particle {
              position: absolute;
              width: 6px;
              height: 6px;
              background-color: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              /* Apply animation using CSS variables for duration and delay */
              animation: particleMove var(--animation-duration) infinite alternate var(--animation-delay);
            }
          `}
        </style>
        <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
          {/* Create particle background using pre-generated data */}
          {particleData.map((data, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: data.top,
                left: data.left,
                '--animation-delay': data.animationDelay,
                '--animation-duration': data.animationDuration,
              }}
            ></div>
          ))}
          <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-8 text-center relative z-10">
            <h1 className="text-5xl font-extrabold mb-6 text-green-400 animate-pulse">
              Guess the Game!
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Test your knowledge of video games. How many can you guess correctly?
            </p>
            <button
              onClick={() => setHasStarted(true)} // Set hasStarted to true to begin the quiz
              className="px-10 py-4 bg-blue-600 text-white text-2xl  rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  // Render the quiz finished screen if all questions have been answered
  if (currentIndex >= questions.length) {
    let feedbackMessage = '';
    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
      feedbackMessage = "Flawless Victory! You're a true gaming guru! 🏆";
    } else if (percentage >= 70) {
      feedbackMessage = "Impressive! You've got some serious gaming knowledge! 👍";
    } else if (percentage >= 40) {
      feedbackMessage = "Good effort! Keep playing and learning! 🎮";
    } else {
      feedbackMessage = "Looks like you need more practice! Time to hit the game library! 😅";
    }

    return (
      <Fragment> {/* Use Fragment as the root to allow multiple top-level elements */}
        {/* Tailwind CSS CDN for styling */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Coolvetica Font */}
        <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet" />
        <style>
          {`
            @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
            body {
              font-family: 'Coolvetica', sans-serif;
              overflow: hidden; /* Prevent scrollbar due to animation */
            }
            /* Keyframes for the particle floating animation, including centering */
            @keyframes particleMove {
              0% { transform: translate(-50%, -50%) translate(0px, 0px); }
              100% { transform: translate(-50%, -50%) translate(20px, 20px); }
            }
            .particle {
              position: absolute;
              width: 6px;
              height: 6px;
              background-color: rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              /* Apply animation using CSS variables for duration and delay */
              animation: particleMove var(--animation-duration) infinite alternate var(--animation-delay);
            }
          `}
        </style>
        <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
          {/* Create particle background using pre-generated data */}
          {particleData.map((data, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: data.top,
                left: data.left,
                '--animation-delay': data.animationDelay,
                '--animation-duration': data.animationDuration,
              }}
            ></div>
          ))}
          <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-8 text-center relative z-10">
            <h1 className="text-4xl mb-4 text-green-400">Quiz Finished!</h1>
            <p className="text-2xl mb-6 text-gray-300">
              Your score: <span className="text-green-300">{score}</span> / {questions.length}
            </p>
            {/* Score-based comment */}
            <p className="text-xl mb-8 text-yellow-300">
              {feedbackMessage}
            </p>
            <button
              onClick={() => {
                // Reset all states to restart the quiz
                setCurrentIndex(0);
                setScore(0);
                setTimer(10);
                setHasStarted(false); // Go back to the landing page
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  // Render the quiz itself
  return (
    <Fragment> {/* Use Fragment as the root to allow multiple top-level elements */}
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Coolvetica Font */}
      <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet" />
      <style>
        {`
          @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
          body {
            font-family: 'Coolvetica', sans-serif;
            overflow: hidden; /* Prevent scrollbar due to animation */
          }
          /* Keyframes for the particle floating animation, including centering */
          @keyframes particleMove {
            0% { transform: translate(-50%, -50%) translate(0px, 0px); }
            100% { transform: translate(-50%, -50%) translate(20px, 20px); }
          }
          .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            /* Apply animation using CSS variables for duration and delay */
            animation: particleMove var(--animation-duration) infinite alternate var(--animation-delay);
          }
        `}
      </style>
      <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        {/* Create particle background using pre-generated data */}
        {particleData.map((data, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: data.top,
              left: data.left,
              '--animation-delay': data.animationDelay,
              '--animation-duration': data.animationDuration,
            }}
          ></div>
        ))}
        <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg text-gray-400">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="text-right text-red-500 text-2xl animate-pulse">
              Time left: {timer}s
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex) / questions.length) * 100}%`
              }}
            />
          </div>

          {/* Conditionally render QuestionCard only if the current question exists */}
          {questions?.[currentIndex] && (
            <QuestionCard
              question={questions?.[currentIndex]}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
