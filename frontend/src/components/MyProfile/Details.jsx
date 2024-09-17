import React from "react";
import { useUser } from "../../contexts/UserProvider";
import { useEffect, useState } from "react";

export default function Details() {
  const { userDetails } = useUser();
  const [experts, setExperts] = useState([]);
  const [students, setStudents] = useState([]);
  const [skills, setSkills] = useState([]);

  //fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/skills/api/skills/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);
  //fetch experts
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/exp/experts/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setExperts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExperts();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/students/students/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);
  const expertSkills = experts
    .filter((expert) => expert.user === userDetails.id)
    .map((expert) => {
      const skill = skills.find((skill) => skill.id === expert.skill_id);
      return skill ? skill.name : "Unknown Skill";
    });

  const studentSkills = students
    .filter((student) => student.user === userDetails.id)
    .map((student) => {
      const skill = skills.find((skill) => skill.id === student.skill_id);
      return skill ? skill.name : "Unknown Skill";
    });

  return (
    <div className="col-md-7">
      <div className="col-md-20">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">{userDetails?.name}</div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <a
                  href="/cdn-cgi/l/email-protection"
                  className="__cf_email__"
                  data-cfemail="c4a2adb484aeb1afa9b1aceaa5a8"
                >
                  {userDetails?.email}
                </a>
              </div>
            </div>

            {expertSkills.length > 0 && <hr />}
            {expertSkills.length > 0 && (
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Skills expert</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {expertSkills.join(", ")}
                </div>
              </div>
            )}
            {studentSkills.length > 0 && <hr />}
            {studentSkills.length > 0 && (
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Skills to learn</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {studentSkills.join(", ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
