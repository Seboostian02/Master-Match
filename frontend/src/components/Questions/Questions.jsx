import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import PopUp from "./PopUp";

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/question_answer/questions/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
    <PopUp/>
    <div className="d-flex flex-column justify-content-center" style={{ margin: '20px 200px 0px 200px' }}>
      {questions.map((question, index) => (
        <QuestionCard key={index} index={index} question={question}></QuestionCard>
      ))}
    </div>
    </>
  );
}
