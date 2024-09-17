import React from "react";
import styles from "./Trainings.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/esm/Button";

export default function Card({ skill }) {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.content}>
            <h2>{skill.name}</h2>
            <p>{skill.description}</p>
            <p>{`number of students:${skill.number_of_students}`}</p>
            <p>{`number of teachers:${skill.number_of_teachers}`}</p>
            <Link to={`${skill.id}`}>
              <p>See All</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  Card.propTypes = {
    skill: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      number_of_students: PropTypes.number.isRequired,
      number_of_teachers: PropTypes.number.isRequired,
    }).isRequired,
  };
}
