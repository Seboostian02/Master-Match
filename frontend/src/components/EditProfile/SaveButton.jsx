import React from 'react';
import styles from "./SaveButton.module.css";

export default function Save() {
  const handleSave = () => {
    // Add save functionality here
    alert("Changes saved!");
  };

  return (
    <button onClick={handleSave} className={`${styles.button} ${styles.saveButton}`}>
      Save
    </button>
  );
}
