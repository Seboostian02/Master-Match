import React, { useState } from "react";
import styles from "./FormTraining.module.css"; // Import the CSS module
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useUser } from "../../contexts/UserProvider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { z } from "zod";

function VerticallyCenteredModal(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userDetails } = useUser();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  const schema = z.object({
    title: z.string().min(1, { message: "Title cannot be empty" }),
    description: z.string().min(1, { message: "Description cannot be empty" }),
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      title,
      description,
      userDetails,
      id,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});

      const token = Cookies.get("token");

      try {
        const response = await fetch("http://localhost:8000/trainings/add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setTitle(" ");
          setDescription(" ");
          window.location.reload();
        }
      } catch (error) {}
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
          New Training
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="d-flex flex-column">
            <label>Title</label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} />
            {errors.title && (
              <span className={styles.error}>{errors.title[0]}</span>
            )}
            <label>Description</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {errors.description && (
              <span className={styles.error}>{errors.description[0]}</span>
            )}
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
        <span className={styles["button-slanted-content"] }>Add Training</span>
      </button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default FormTraining;
