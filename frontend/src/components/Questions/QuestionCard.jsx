import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function QuestionCard({ index, question }) {
  const [skills, setSkills] = useState([]);

  async function handleDelete(e) {
    e.preventDefault();

    const questionId = question.id;

    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `http://localhost:8000/question_answer/delete_question/${questionId}/`,
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

  const skillName = skills.find((skill) => skill.id === question.skill)?.name;

  return (
    <div key={index}>
      <div className="card w-auto justify-content-center">
        <div className="card-body">
          <h5 className="card-title">
            <u>Question {index + 1}</u>
          </h5>
          <p className="card-text bg-light">{question.description}</p>
          <span className="card-text">
            <mark className="bg-success text-white">
              {" "}
              {skillName || "Unknown skill"}
            </mark>
            <p className="text-secondary fs-6">
              Created:{" "}
              {moment(question.created_at).format("MMMM Do YYYY, h:mm:ss a")}{" "}
            </p>
          </span>
          <Link to={`${question.id}`}>
            <p className="btn btn-light">Open</p>
          </Link>
          <p className="btn btn-secondary" onClick={handleDelete}>
            Delete
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}
