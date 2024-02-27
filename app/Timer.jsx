"use client";

import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [seconds, setSeconds] = useState(200);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    setIsActive(true);
    setIntervalId(
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000)
    );
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const resetTimer = () => {
    setSeconds(0);
    pauseTimer();
  };

  const stopTimer = () => {
    setSeconds(0);
    setIsActive(false);
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (seconds === 0 && isActive) {
      setIsActive(false);
      clearInterval(intervalId);
    }
  }, [seconds, isActive, intervalId]);

  const formattedTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="countdown-timer flex flex-col items-center">
      <h1 className="text-4xl font-bold">{formattedTime()}</h1>
      <div className="btn-wrapper flex space-x-2 mt-4">
        <button
          onClick={startTimer}
          disabled={isActive}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isActive}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
        <button
          onClick={stopTimer}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default CountdownTimer;
