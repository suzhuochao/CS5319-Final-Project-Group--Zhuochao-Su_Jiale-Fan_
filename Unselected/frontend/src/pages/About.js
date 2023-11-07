import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  const location = useLocation();

  return (
    <div className="container">
      <header className="mt-4 mb-4 text-center">
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
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="card mt-3 border-0 bg-light">
              <div class="card-body">
                <h1 class="card-title text-center">Welcome to EthiQuery</h1>
                <p class="card-text" style={{ color: "#333" }}>
                  In a world where moral dilemmas can leave us scratching our heads, we're here to lend an ear—or rather, a few opinions. Powered by our AI-powered API, EthiQuery is your go-to platform for navigating ethical questions. Ask away, and you'll receive a curated list of perspectives to help you see every angle of the issue. From philosophy to pop culture, we've got it all covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
