import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import PropTypes from "prop-types";

export default function PopUp(props) {
  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.training.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Description:</h4>
        <hr></hr>
        <p>{props.training.description}</p>
      </Modal.Body>
      <Modal.Footer style={footerStyle}>
        <p>{`number of participants: ${props.training.number_of_participants}`}</p>
        <Button variant="success" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

PopUp.propTypes = {
  training: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    number_of_participants: PropTypes.number,
  }),
  onHide: PropTypes.func.isRequired,
};
