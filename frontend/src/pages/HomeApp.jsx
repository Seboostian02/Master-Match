import React from "react";
import { useUser } from "../contexts/UserProvider";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import photo from "../assets/people.png";
import darkSide from "../assets/dark-side.jpg";

export default function HomeApp() {
  const { userDetails } = useUser();

  useEffect(() => {
    if (!userDetails) {
      const timer = setTimeout(() => {
        window.location.reload(); // Reload the page
      }, 100); // 100 ms

      return () => clearTimeout(timer);
    }
  }, [userDetails]);

  return (
    <section
      className="container-fluid d-flex align-items-center ms-5"
      style={{ height: "70vh" }}
    >
      <div className="row w-100">
        {/* Stanga - Titlu, Descriere, Butoane */}
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 className="display-3 fw-bold mb-4">
            {userDetails?.name ? `Bine ai venit, ${userDetails.name}!` : null}
          </h1>
          <p className="lead mb-4">
            Bine ai venit pe aplicația noastră! Aici ai ocazia să descoperi Training-uri personalizate de la experții noștri
            și să afli de la cei mai buni informațiile căutate. Explorează skill-urile in pagina dedicata Training-urilor, iar daca
            ai întrebări, nu ezita să accesezi secțiunea de Questions.
          </p>
          <div>
            <Button
              variant="success"
              className="btn btn-primary me-2"
              href="/app/trainings"
            >
              View Trainings
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary"
              href="/app/questions"
            >
              Explore Questions
            </Button>
          </div>
        </div>
        {/* Dreapta - Imagine */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <img src={photo} alt="Placeholder" className="img-fluid" />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "-30%",
            height: "100%",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#333",
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            src={darkSide}
            alt="Dark Side"
            style={{
              width: "200%",
              height: "auto",
              marginBottom: "20px",
            }}
          />
          <div>Ce cauți aici?</div>
        </div>
      </div>
    </section>
  );
}
