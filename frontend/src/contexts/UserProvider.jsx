import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      const token = Cookies.get("token");

      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/user/details/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
          setIsAuthenticated(true);
        } else {
          setError("Failed to fetch user details");
        }
      } catch (error) {
        setError("Error fetching user details");
        console.error("Error fetching user details", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider
      value={{ userDetails, loading, error, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
