import React, { useState, useEffect } from "react";
import styles from "./TrainingCard.module.css";
import PropTypes from "prop-types";
import PopUp from "./PopUp";
import Cookies from "js-cookie";

export default function TrainingCard({
  trainingList,
  addButton = null,
}) {
  const [modalShow, setModalShow] = useState(false);

  const handleJoin = async () => {

      const token = Cookies.get("token");
      const id = trainingList.id;

      const formData = {
        id,
      };

      try {
        const response = await fetch(
          `http://localhost:8000/trainings/join_training/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        window.location.reload();
        alert("You join a training!");

      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.box}>
          <span></span>
          <div className={styles.content}>
            {trainingList.id && (
              <>
                <h2>{trainingList.name}</h2>
                <p>{trainingList.description}</p>
                <a role="button" className="border mx-2 pe-auto" onClick={() => setModalShow(true)}>Training details</a>
                <a role="button" onClick={handleJoin} className="border mx-2">Join Training</a>

                <PopUp
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  training={trainingList}
                />
              </>
            )}

            {addButton && <div>{addButton}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

TrainingCard.propTypes = {
  trainingList: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
  addButton: PropTypes.element,
};
