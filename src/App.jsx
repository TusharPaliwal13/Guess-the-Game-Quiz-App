import React, { useState, useEffect, Fragment } from 'react';
import questions from './components/questions'; // Update path if needed
import QuestionCard from './components/QuestionCard'; // Update path if needed

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [hasStarted, setHasStarted] = useState(false);
  const [particleData, setParticleData] = useState([]);

  useEffect(() => {
    const generatedData = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));
    setParticleData(generatedData);
  }, []);

  useEffect(() => {
    if (!hasStarted || currentIndex >= questions.length) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setCurrentIndex((prev) => prev + 1);
          return 10;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, hasStarted]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    setCurrentIndex(currentIndex + 1);
    setTimer(10);
  };

  if (!hasStarted) {
    return (
      <Fragment>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />

        
        <style>
          {`
            @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
            body {
              font-family: 'Coolvetica', sans-serif;
              overflow: hidden;
            }
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
              animation: particleMove var(--animation-duration) infinite alternate var(--animation-delay);
            }
          `}
        </style>
        <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
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
          <h1 className="text-8xl font-extrabold text-green-400 animate-pulse mb-30">
            React - a - Shot
          </h1>
          <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-8 text-center relative z-10">
            <p className="text-2xl font-semibold mb-6 text-gray-300">
              Guess the Game, One Shot at a Time!
            </p>
            <p className="text-xl mb-8 text-gray-400">
              Test your knowledge of video games from just a single screenshot.
            </p>
            <button
              onClick={() => setHasStarted(true)}
              className="px-10 py-4 bg-blue-600 text-white text-2xl rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

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
      <Fragment>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet" />
        <style>
          {`
            @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
            body {
              font-family: 'Coolvetica', sans-serif;
              overflow: hidden;
            }
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
              animation: particleMove var(--animation-duration) infinite alternate var(--animation-delay);
            }
          `}
        </style>
        <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
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
            <p className="text-xl mb-8 text-yellow-300">
              {feedbackMessage}
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setTimer(10);
                setHasStarted(false);
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

  return (
    <Fragment>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.cdnfonts.com/css/coolvetica-2" rel="stylesheet" />
      <style>
        {`
          @import url('https://fonts.cdnfonts.com/css/coolvetica-2');
          body {
            font-family: 'Coolvetica', sans-serif;
            overflow: hidden;
          }
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
            animation: particleMove var(--animation-duration) infinite alternate var(--animation-delay);
          }
        `}
      </style>
      <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
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

        <h1 className="text-6xl font-extrabold text-green-400 mb-6" style={{ fontFamily: "'Coolvetica', sans-serif" }}>
          React - a - Shot
        </h1>

        <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg text-gray-400">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="text-right text-red-500 text-2xl animate-pulse">
              Time left: {timer}s
            </div>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex) / questions.length) * 100}%`
              }}
            />
          </div>

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
