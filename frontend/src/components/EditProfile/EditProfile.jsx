import React from "react";
import styles from "./EditProfile.module.css";
import UserAvatar from "./UserAvatar";
import Details from "./Details";
import Cancel from "./CancelButton";
import Button from 'react-bootstrap/Button';

export default function MyProfile() {
  return (
    <div className={styles.profileContainer}>
      <UserAvatar />
      <Details />
    </div>
  );
}
