import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Question from "../components/Question";

import Image from "../media/image2.png";

const Home = () => {
  const location = useLocation();

  return (
    <>
      <header className="mt-4 mb-4 text-center container">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="display-4 text-primary">EthiQuery</h1>
          <nav className="nav">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/how-to-use" className={`nav-link ${location.pathname === "/how-to-use" ? "active" : ""}`}>
                  How to Use
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}>
                  History
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="text-center">
          <img
            src={Image}
            alt="Logo"
            className="img img-fluid"
            style={{
              maxHeight: "30vh",
              borderRadius: "10%",
            }}
          />
        </div>
        <Question />
      </div>
    </>
  );
};

export default Home;
