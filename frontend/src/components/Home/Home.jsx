import React from "react";
import "./home.css";

export const Home = () => {
  return (
    <main className="homepage">
      <div className="jumbotron">
        <h1 className="display-4">Master Match</h1>
        <p className="lead">Găsește un training pentru orice skill pe care vrei să îl înveți.</p>
        <hr className="my-5" />
        <p>Hai și tu!</p>
        <a className="btn btn-success btn-lg" role="button" href="login">
          Log in / Sign up
        </a>
      </div>
    </main>
  );
};

export default Home;
