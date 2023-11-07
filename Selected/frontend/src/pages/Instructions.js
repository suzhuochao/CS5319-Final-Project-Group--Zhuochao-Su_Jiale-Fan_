import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { Timeline } from "@arco-design/web-react";
const TimelineItem = Timeline.Item;
const Instructions = () => {
  const location = useLocation();

  const useStep = [
    {
      title: "Ask a Question:",
      content: "Type your ethical question into the text box at the top of the page. Aim for specificity to get more targeted opinions.",
    },
    {
      title: "Choose a Stance",
      content: `Below the text box, you'll see three buttons: "For," "Against," and "Neutral." Click the one that aligns with the viewpoint you're interested in exploring.`,
    },
    {
      title: "Read & Reflect",
      content: "Scroll through the provided viewpoints. You'll see a variety of perspectives based on your chosen stance to help you navigate the ethical waters.",
    },
  ];

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
      <div class="container mt-4">
        {/* <div class="row">
          <div class="col-md-12">
            <ul class="list-group mt-3 bg-light border-radius">
              <li class="list-group-item border-0 mt-2 bg-light">
                <strong>1. Ask a Question:</strong> Type your ethical question into the text box at the top of the page. Aim for specificity to get more targeted opinions.
              </li>
              <li class="list-group-item border-0 mt-2 bg-light">
                <strong>2. Choose a Stance:</strong> Below the text box, you'll see three buttons: "For," "Against," and "Neutral." Click the one that aligns with the viewpoint you're interested in exploring.
              </li>
              <li class="list-group-item border-0 mt-2 bg-light">
                <strong>3. Read & Reflect:</strong> Scroll through the provided viewpoints. You'll see a variety of perspectives based on your chosen stance to help you navigate the ethical waters.
              </li>
            </ul>
          </div>
        </div> */}

        <Timeline>
          {useStep.map((cell, idx) => {
            return (
              <TimelineItem label={cell.content}>
                {idx + 1}.{cell.title}
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
      <Footer />
    </div>
  );
};

export default Instructions;
