import React from "react";
import moment from "moment";
import Cookies from "js-cookie";
import styles from "./Answers.module.css";

export default function AnswersCard({ index, answer }) {
  async function handleDelete(e) {
    e.preventDefault();

      const answerId = answer.id

      const token = Cookies.get("token");

      try {
        const response = await fetch(`http://localhost:8000/question_answer/delete_answer/${answerId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {}
  }

  return (
    <div key={index} className={styles.answer}>
    <div className={styles.answerBody}>
      <p>{answer.description}</p>
    </div>
    <div className={styles.answerFooter}>
      Answered by <strong>{answer.user} </strong>on{" "}
      {moment(answer.date).format("MMMM Do YYYY, h:mm:ss a")}
    </div>
    <p className="btn btn-secondary" onClick={handleDelete}>Delete</p>         
    </div>
  );
}
