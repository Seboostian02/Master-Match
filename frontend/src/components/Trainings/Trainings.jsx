import Card from "./Card";
import styles from "./Trainings.module.css";
import React, { useState, useEffect } from "react";

export default function Trainings() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/skills/api/skills/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className={styles.trainings}>
      {skills.map((skill, index) => (
        <Card key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
