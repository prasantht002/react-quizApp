import React, { useEffect, useState } from "react";
import data from "./data.json";
export const Quizapp = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);
  const [timer,setTimer]=useState(10);

  useEffect(()=>{
    let interval;
    if(timer>0 && !displayScore){
        interval=setInterval(()=>{
            setTimer((prevTimer)=>prevTimer-1)
        },1000);
    }
    else{
        clearInterval(interval)
        if(!displayScore && currentQuestion<data.length-1){
            setCurrentQuestion(prevQuestion=>prevQuestion+1);
            setTimer(10);
        }
        else{
            setDisplayScore(true);
        }
    }
    return ()=>clearInterval(interval);
  },[timer,displayScore,currentQuestion])
  const handleCorrectAnswer = (e) => {
    setTimer(10);
    if (e.target.value === data[currentQuestion].correctOption) {
      setScore(prevScore=>prevScore + 1);
    }
    if(currentQuestion<data.length-1){
        setCurrentQuestion((prevQuestion)=>prevQuestion+1);
    }
    else{
        setDisplayScore(true);
    }
  };
  const handleRestart=()=>{
    setCurrentQuestion(0);
    setDisplayScore(false);
    setTimer(10);
  }
  return (
    <div className="container">
        {displayScore ? (
            <div className="score-section">
            <h4>
              Your Score: {score}/{data.length}
            </h4>
            <button className="restartButton" onClick={handleRestart}>Restart</button>
          </div>
        ):(
            <div>
        <div className="question-section">
          <h5>Question {currentQuestion + 1}</h5>
          <p>{data[currentQuestion].question}</p>
        </div>
        <div className="answer-section">
          {data[currentQuestion].options.map((option, index) => (
            <button value={option} onClick={(e) => handleCorrectAnswer(e)}>
              {option}
            </button>
          ))}
        </div>
        <div className="timer-section">
          <p>
            Time Left: <span>{timer}s</span>
          </p>
        </div>
      </div>

        )}
      
      
    </div>
  );
};
