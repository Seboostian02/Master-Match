import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>For bussines</h4>
            <a href="https://www.continental.com/ro-ro/">
              <p>Continental Automotive, Iasi</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Master Match</h4>
            <a href="home">
              <p>Home</p>
            </a>
            <a href="/app/about">
              <p>About us</p>
            </a>
            <a href="trainings">
              <p>Trainings</p>
            </a>
            <a href="questions">
              <p>Questions</p>
            </a>
          </div>

          <div className="sb__footer-links_div">
            <h4>Team</h4>
            <a href="/employer">
              <p>Aldea Alexandra-Maria</p>
            </a>

            <a href="/sebi-cel-florin">
              <p>Ciurdea Florin-Sebastian</p>
            </a>

            <a href="/employer">
              <p>Guzovatii Luminita</p>
            </a>
          </div>
        </div>
        <hr></hr>

        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              @{new Date().getFullYear()} STIKmeni, Inc. All rights reserved
              (╯°□°）╯︵ ┻━┻
            </p>
          </div>
          <div className="sb__footer-below-links">
            <a href="/terms">
              <div>
                <p>Terms and Conditions</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
