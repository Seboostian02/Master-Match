import React from "react";
import styles from "./MyProfile.module.css";
import UserAvatar from "./UserAvatar";
import Details from "./Details";

export default function MyProfile() {
  return (
    <div className={styles.profileContainer}>
      <UserAvatar />
      <Details />
    </div>
  );
}
