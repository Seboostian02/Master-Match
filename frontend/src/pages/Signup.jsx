import styles from "./Signup.module.css";
import Header from "../components/Header/Header";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import countEmojis from "../functions/countEmojis";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/skills/api/skills/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const formattedSkills = data.map((skill) => ({
          ...skill,
          selected: false,
          IsExpert: false,
        }));
        setSkills(formattedSkills);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleSelect = (index) => {
    const newSkills = [...skills];
    newSkills[index].selected = true;
    setSkills(newSkills);
  };

  const handleCancel = (index) => {
    const newSkills = [...skills];
    newSkills[index].selected = false;
    setSkills(newSkills);
  };

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "Email cannot be empty" })
      .email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
    name: z.string().min(1, { message: "Name cannot be empty" }),
    // .max(30, { message: "Name too long" }),
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const numberOfEmojis = countEmojis(name);
    const totalLength = name.length;

    if (numberOfEmojis > 1) {
      setErrors({
        name: ["Only 1 emoji allowed."],
      });
      return;
    }

    if (totalLength > 30) {
      setErrors({
        fullName: ["Name too long."],
      });
      return;
    }

    const formData = {
      email,
      password,
      name,
      skills,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
    } else {
      setErrors({});

      try {
        const response = await fetch("http://localhost:8000/user/register/", {
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
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.un}
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {errors.name && (
            <span className={styles.error}>{errors.name[0]}</span>
          )}
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
          <span></span>

          <div className="d-flex justify-content-between align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Choose Skills
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {skills
                  .filter((skill) => !skill.selected)
                  .map((skill, index) => (
                    <Dropdown.Item
                      key={skill.name}
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(index);
                      }}
                    >
                      {skill.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
            <a
              className="link-secondary link-opacity-50 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleGoBack();
              }}
            >
              Go Back
            </a>
          </div>

          <div className="d-flex justify-content-center">
            <div className="">
              {skills.map(
                (skill, index) =>
                  skill.selected && (
                    <div
                      key={skill.name}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <p className="m-4">{skill.name}</p>
                      <input
                        className="form-check-input m-auto"
                        type="checkbox"
                        onChange={() => (skill.IsExpert = true)}
                      />
                      <label
                        className="form-check-label p-1"
                        htmlFor="flexCheckDefault"
                      >
                        Expert
                      </label>
                      <button
                        type="button"
                        className="m-3 btn btn btn-dark"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCancel(index);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
          <Container className="col-10">
            <Row className="justify-content-center">
              <Col>
                <div className="d-grid gap-2 col-9 mx-auto">
                  <Button type="submit" variant="success">
                    Create user
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </form>
      </main>
    </div>
  );
}
