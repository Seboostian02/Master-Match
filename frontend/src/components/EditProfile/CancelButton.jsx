import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./CancelButton.module.css";

export default function Cancel() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('../my-profile');
  };

  return (
    <button onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>
      Cancel
    </button>
  );
}
