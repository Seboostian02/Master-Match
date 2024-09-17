import React, { useState, useEffect } from "react";
import styles from "./Question.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useUser } from "../../contexts/UserProvider";
import PropTypes from "prop-types";
import { z } from "zod";

function VerticallyCenteredModal(props) {
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const { userDetails } = useUser();
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState([]);

  const schema = z.object({
    description: z.string().min(1, { message: "Description cannot be empty" }),
  });

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

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      description,
      userDetails,
      skill,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});

      const token = Cookies.get("token");

      try {
        const response = await fetch(
          "http://localhost:8000/question_answer/add_question/",
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
          setDescription("");
          setSkill("");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error submitting question:", error);
      }
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label>Description</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {errors.description && (
              <span className={styles.error}>{errors.description[0]}</span>
            )}
          </div>

          <div className="d-flex flex-column mt-3">
            <label>Skill</label>
            <select
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
              className="form-select"
            >
              <option value="">Select a skill</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

VerticallyCenteredModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

function FormTraining() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className={`${styles.button} ${styles["button-slanted"]}`}
        onClick={() => setModalShow(true)}
      >
        <span className={styles["button-slanted-content"]}>Add Question</span>
      </button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default FormTraining;
