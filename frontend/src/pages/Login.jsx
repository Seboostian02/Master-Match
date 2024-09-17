import styles from "./Login.module.css";
import Header from "../components/Header/Header";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Cookies from "js-cookie";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "Email cannot be empty" })
      .email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});

      try {
        const response = await fetch("http://localhost:8000/user/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new errors("Error");
        }

        const data = await response.json();
        Cookies.set("token", data.token);
        navigate("/app");
      } catch (error) {
        console.log("Fetch Error");
      }
    }
  }

  return (
    <div>
      <Header />
      <main className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="email">
              Email address
            </label>
            <input
              className={styles.un}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {errors.email && (
            <span className={styles.error}>{errors.email[0]}</span>
          )}

          <div className={styles.row}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.pass}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password[0]}</span>
          )}

          <Container className="col-10">
            <Row className="d-flex justify-content-between">
              <Col>
                <a>Forgot Password</a>
              </Col>
              <Col className="text-end">
                <p>
                  <a
                    className="link-secondary link-opacity-50 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/signup"
                  >
                    Not a member?
                  </a>
                </p>
              </Col>
            </Row>
          </Container>

          <Row className="justify-content-center">
            <Col>
              <div className="d-grid gap-2 col-9 mx-auto">
                <Button
                  type="submit"
                  variant="success"
                  className="btn btn-primary"
                >
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </main>
    </div>
  );
}
