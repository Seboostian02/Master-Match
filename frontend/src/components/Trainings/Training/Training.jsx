import React, { useState, useEffect } from "react";
import TrainingCard from "./TrainingCard";
import styles from "./TrainingCard.module.css";
import buttonStyles from "./TrainingButton.module.css"; // Import the new button styles
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import FormTraining from "../FormTraining";
import { useUser } from "../../../contexts/UserProvider";

export default function Training() {
  const { userDetails } = useUser();
  const { id } = useParams();
  const [trainingList, setTrainingList] = useState([]);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainingResponse = await fetch(
          `http://127.0.0.1:8000/trainings/training/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!trainingResponse.ok) {
          throw new Error(
            `Training HTTP error! status: ${trainingResponse.status}`
          );
        }

        const trainingData = await trainingResponse.json();
        setTrainingList(trainingData);

        const expertsResponse = await fetch(
          `http://localhost:8000/exp/experts/`
        );

        if (!expertsResponse.ok) {
          throw new Error(
            `Experts HTTP error! status: ${expertsResponse.status}`
          );
        }

        const expertsData = await expertsResponse.json();
        setExperts(expertsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  useEffect(() => {
    if (!userDetails) {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 1000); // 1000 ms

      return () => clearTimeout(timer);
    }
  }, [userDetails]);

  if (loading || !userDetails) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  const filteredTrainingData = trainingList?.filter(
    (training) => training.skill_id === parseInt(id)
  );

  const isUserExpert = experts.some(
    (expert) =>
      expert.user === userDetails?.id && expert.skill_id === parseInt(id)
  );

  return (
    <div>
      {isUserExpert && (
        <div className={buttonStyles.customButtonContainer}>
          <FormTraining className={buttonStyles.customButton} />
        </div>
      )}

      <div className={styles.card}>
        {filteredTrainingData?.length > 0 ? (
          filteredTrainingData.map((training, index) => (
            <TrainingCard key={index} trainingList={training} />
          ))
        ) : (
          <p>No trainings found.</p>
        )}
      </div>
    </div>
  );
}
