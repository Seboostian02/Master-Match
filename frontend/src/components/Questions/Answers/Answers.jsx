import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Answers.module.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { useUser } from "../../../contexts/UserProvider";
import AnswersCard from "./AnswersCard";

const initialQuestionData = {
  id: 12345,
  description: "Incerc sa fac ceva dar nu stiu ce si iese.",
  tags: ["javascript", "html", "css", "bootstrap"],
};

export default function Answers() {
  const { id } = useParams();
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const { userDetails } = useUser();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/skills/api/skills/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);
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

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchAnswers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/question_answer/answers/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnswers(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchAnswers();
  }, []);

  async function handleDelete(e) {
    e.preventDefault();

    const token = Cookies.get("token");
    const answer_id = 7;

    try {
      const response = await fetch(
        `http://localhost:8000/question_answer/delete_answer/${answer_id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {}
  }

  async function handleReply(e) {
    e.preventDefault();

    const formData = {
      newAnswer,
      userDetails,
      id,
    };

    const token = Cookies.get("token");

    try {
      const response = await fetch(
        "http://localhost:8000/question_answer/add_answer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (questions.length > 0) {
      const foundQuestion = questions.find(
        (question) => question.id === parseInt(id)
      );
      setSelectedQuestion(foundQuestion);
    }
  }, [questions, id]);

  const skillName = skills.find(
    (skill) => skill?.id === selectedQuestion?.skill
  )?.name;

  console.log(skillName);
  return (
    <div className={styles.container}>
      {/* Question Section */}
      <div className={styles.questionSection}>
        <h2>Question ID: {selectedQuestion?.id}</h2>
        <p>{selectedQuestion?.description}</p>

        {/* Tags */}
        <div className={styles.tags}>
          <span className={styles.tag}>{skillName}</span>
        </div>

        {/* New Answer Input */}
        <div className={styles.newAnswerSection}>
          <textarea
            className={styles.textarea}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Type your answer here..."
          />
          <Button
            className={`btn btn-primary ${styles.replyButton}`}
            onClick={handleReply}
            variant="success"
          >
            Reply
          </Button>
        </div>
      </div>

      <hr />

      {/* Answers Section */}
      <div className={styles.answerSection}>
        <h4>{answers.length} Answers</h4>
        {answers.map((answer, index) => (
          <AnswersCard key={index} index={index} answer={answer} />
        ))}
      </div>
    </div>
  );
}
