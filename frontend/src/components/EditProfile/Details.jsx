import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import Cancel from "./CancelButton";
import Button from "react-bootstrap/Button";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Cookies from "js-cookie";
const ItemType = "SKILL";
import { z } from "zod";
import countEmojis from "../../functions/countEmojis";

function isValidInput(text) {
  const numberOfEmojis = countEmojis(text);

  const totalLength = text.length;
  const adjustedLength = totalLength - numberOfEmojis;

  return numberOfEmojis <= 1 && adjustedLength <= 30;
}

export default function Details() {
  const { userDetails, loading, error } = useUser();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const [remainingSkills, setRemainingSkills] = useState([]);
  const [studentSkills, setStudentSkills] = useState([]);
  const [expertSkills, setExpertSkills] = useState([]);
  const [skills, setSkills] = useState([]);

  const schema = z.object({
    email: z
      .string()
      .min(1, { message: "Email cannot be empty" })
      .email({ message: "Invalid email address" }),
    fullName: z.string().min(1, { message: "Name cannot be empty" }),
    // .max(30, { message: "Name too long" }),
  });

  // Fetch skills, expert skills, and student skills sincron
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all skills
        const skillsResponse = await fetch(
          "http://localhost:8000/skills/api/skills/"
        );
        if (!skillsResponse.ok) throw new Error("Network response was not ok");
        const skillsData = await skillsResponse.json();
        const formattedSkills = skillsData.map((skill) => ({
          label: skill.name,
          value: skill.id,
        }));

        setSkills(formattedSkills);

        // Fetch expert skills
        const expertResponse = await fetch(
          "http://127.0.0.1:8000/exp/experts/"
        );
        if (!expertResponse.ok) throw new Error("Network response was not ok");
        const expertData = await expertResponse.json();

        const userExpertSkills = expertData
          .filter((expert) => expert.user === userDetails.id)
          .map((expert) => {
            const skill = formattedSkills.find(
              (s) => s.value === expert.skill_id
            );
            return skill ? skill : null;
          })
          .filter((skill) => skill !== null);

        setExpertSkills(userExpertSkills);

        const remainingAfterExperts = formattedSkills.filter(
          (skill) =>
            !userExpertSkills.some(
              (userSkill) => userSkill.value === skill.value
            )
        );
        setRemainingSkills(remainingAfterExperts);

        // Fetch student skills
        const studentResponse = await fetch(
          "http://127.0.0.1:8000/students/students/"
        );
        if (!studentResponse.ok) throw new Error("Network response was not ok");
        const studentData = await studentResponse.json();

        const userStudentSkills = studentData
          .filter((student) => student.user === userDetails.id)
          .map((student) => {
            const skill = formattedSkills.find(
              (s) => s.value === student.skill_id
            );
            return skill ? skill : null;
          })
          .filter((skill) => skill !== null);

        setStudentSkills(userStudentSkills);

        const remainingAfterStudents = remainingAfterExperts.filter(
          (skill) =>
            !userStudentSkills.some(
              (userSkill) => userSkill.value === skill.value
            )
        );
        setRemainingSkills(remainingAfterStudents);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    if (userDetails) {
      fetchData();
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      setEmail(userDetails.email || "");
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && userDetails.name) {
      setFullName(userDetails.name || "");
    }
  }, [userDetails]);

  const updateName = async (event) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch("http://localhost:8000/user/update-name/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ name: fullName }),
      });

      if (response.ok) {
      } else {
        const data = await response.json();
        alert(data.error || "An error occurred");
      }
    } catch (err) {
      alert("An error occurred");
    }
  };

  const updateEmail = async (event) => {
    const token = Cookies.get("token");

    try {
      const response = await fetch("http://localhost:8000/user/update-email/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setErrors(null);
      } else {
        const data = await response.json();
        setErrors(data.error || "An error occurred");
      }
    } catch (err) {
      setErrors("An error occurred");
    }
  };

  const updateStudentSkillList = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        "http://localhost:8000/students/update-student-skills/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            user_id: userDetails.id,
            skills: studentSkills.map((skill) => skill.value),
          }),
        }
      );

      if (response.ok) {
      } else {
        const data = await response.json();
        alert(data.error || "An error occurred");
      }
    } catch (err) {
      alert("An error occurred");
    }
  };

  const updateExpertSkillList = async () => {
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        "http://localhost:8000/exp/update-expert-skills/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            user_id: userDetails.id,
            skills: expertSkills.map((skill) => skill.value),
          }),
        }
      );

      if (response.ok) {
      } else {
        const data = await response.json();
        alert(data.error || "An error occurred");
      }
    } catch (err) {
      alert("An error occurred");
    }
  };

  const handleUpdateUserInfo = async (event) => {
    event.preventDefault();

    const numberOfEmojis = countEmojis(fullName);
    const totalLength = fullName.length;

    if (numberOfEmojis > 1) {
      setErrors({
        fullName: ["Only 1 emoji allowed."],
      });
      return;
    }

    if (totalLength > 30) {
      setErrors({
        fullName: ["Name too long."],
      });
      return;
    }

    const formData = { email, fullName };
    const result = schema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
    } else {
      setErrors({});
      await updateName();
      await updateEmail();
      await updateStudentSkillList();
      await updateExpertSkillList();
      alert("Profile updated successfully");
    }
  };

  const Skill = ({ skill, moveSkill }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType,
      item: { skill },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          moveSkill(item.skill, dropResult.name);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          margin: "8px",
          padding: "8px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #ccc",
        }}
      >
        {skill.label}
      </div>
    );
  };

  const SkillColumn = ({ name, skills, moveSkill }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: () => ({ name }),
    }));

    return (
      <div
        ref={drop}
        style={{
          width: "30%",
          minHeight: "200px",
          margin: "10px",
          padding: "10px",
          backgroundColor: "#e9ecef",
          border: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h5>{name}</h5>
        {skills.map((skill) => (
          <Skill key={skill.value} skill={skill} moveSkill={moveSkill} />
        ))}
      </div>
    );
  };

  const moveSkill = (draggedSkill, column, hoverIndex) => {
    if (column === "Skills I want to learn") {
      const existingIndex = studentSkills.findIndex(
        (s) => s.value === draggedSkill.value
      );

      if (existingIndex !== -1 && hoverIndex !== null) {
        const updatedList = [...studentSkills];
        updatedList.splice(existingIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedSkill);
        setStudentSkills(updatedList);
      } else {
        setRemainingSkills(
          remainingSkills.filter((s) => s.value !== draggedSkill.value)
        );
        setExpertSkills(
          expertSkills.filter((s) => s.value !== draggedSkill.value)
        );
        setStudentSkills([...studentSkills, draggedSkill]);
      }
    } else if (column === "Available Skills") {
      const existingIndex = remainingSkills.findIndex(
        (s) => s.value === draggedSkill.value
      );

      if (existingIndex !== -1 && hoverIndex !== null) {
        const updatedList = [...remainingSkills];
        updatedList.splice(existingIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedSkill);
        setRemainingSkills(updatedList);
      } else {
        setStudentSkills(
          studentSkills.filter((s) => s.value !== draggedSkill.value)
        );
        setExpertSkills(
          expertSkills.filter((s) => s.value !== draggedSkill.value)
        );
        setRemainingSkills([...remainingSkills, draggedSkill]);
      }
    } else if (column === "Skills I can teach") {
      const existingIndex = expertSkills.findIndex(
        (s) => s.value === draggedSkill.value
      );

      if (existingIndex !== -1 && hoverIndex !== null) {
        const updatedList = [...expertSkills];
        updatedList.splice(existingIndex, 1);
        updatedList.splice(hoverIndex, 0, draggedSkill);
        setExpertSkills(updatedList);
      } else {
        setRemainingSkills(
          remainingSkills.filter((s) => s.value !== draggedSkill.value)
        );
        setStudentSkills(
          studentSkills.filter((s) => s.value !== draggedSkill.value)
        );
        setExpertSkills([...expertSkills, draggedSkill]);
      }
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="col-md-7">
        <div className="col-md-20">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9">
                  <textarea
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    className="resizable"
                  />
                  {errors?.fullName && <span>{errors.fullName}</span>}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9">
                  <textarea
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="resizable"
                  />
                  {errors?.email && <span>{errors.email}</span>}
                </div>
              </div>
              <hr />

              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Skills</h6>
                </div>
                <div
                  className="col-sm-9"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <SkillColumn
                    name="Skills I want to learn"
                    skills={studentSkills}
                    moveSkill={moveSkill}
                  />
                  <SkillColumn
                    name="Available Skills"
                    skills={remainingSkills}
                    moveSkill={moveSkill}
                  />
                  <SkillColumn
                    name="Skills I can teach"
                    skills={expertSkills}
                    moveSkill={moveSkill}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Cancel />
            <Button
              variant="success"
              style={{ width: "160px" }}
              onClick={handleUpdateUserInfo}
            >
              Save
            </Button>{" "}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
