import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bigger-footer-container">
      <div className="about-thirsty">
        <h1 className="what-is-thirsty">What is Thirsty?</h1>
        <NavLink to="/about" className="about-thirsty-link">
          <span>About Thirsty</span>
        </NavLink>
      </div>
      <div className="footer-container">
        <h2 className="footer-header">Meet the Team</h2>
        <div className="all-group-container">
          <div className="person-container">
            <h4 className="single-name">Ashkaun Iranfar</h4>
            <div className="links-wrapper">
              <a
                href="https://www.linkedin.com/in/ashkaun-iranfar-608387220/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                <div className="linked-in-wrapper">
                  <div className="linkedin-github-text">LinkedIn</div>
                  <i class="fa-brands fa-linkedin"></i>
                </div>
              </a>
              <a href="https://github.com/AIranfar" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                <div className="github-wrapper">
                  <div className="linkedin-github-text">Github</div>
                  <i class="fa-brands fa-github"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="person-container">
            <h4 className="single-name">Christian Oviedo</h4>
            <div className="links-wrapper">
              <a
                href="https://www.linkedin.com/in/christian-oviedo-6a1586242/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                <div className="linked-in-wrapper">
                  <div className="linkedin-github-text">LinkedIn</div>
                  <i class="fa-brands fa-linkedin"></i>
                </div>
              </a>
              <a href="https://github.com/Christian-815" target="_blank" rel="noopener noreferrer" className="github-link">
                <div className="github-wrapper">
                  <div className="linkedin-github-text">Github</div>
                  <i class="fa-brands fa-github"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="person-container">
            <h4 className="single-name">Han Nguyen</h4>
            <div className="links-wrapper">
              <a
                href="https://www.linkedin.com/in/han-nguyen-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                <div className="linked-in-wrapper">
                  <div className="linkedin-github-text">LinkedIn</div>
                  <i class="fa-brands fa-linkedin"></i>
                </div>
              </a>
              <a href="https://github.com/haaannn123" target="_blank" rel="noopener noreferrer" className="github-link">
                <div className="github-wrapper">
                  <div className="linkedin-github-text">Github</div>
                  <i class="fa-brands fa-github"></i>
                </div>
              </a>
            </div>
          </div>
          <div className="person-container">
            <h4 className="single-name">Mehedi Waheed Meem</h4>
            <div className="links-wrapper">
              <a
                href="https://www.linkedin.com/in/mehedi-waheed-meem-405483257/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-link"
              >
                <div className="linked-in-wrapper">
                  <div className="linkedin-github-text">LinkedIn</div>
                  <i class="fa-brands fa-linkedin"></i>
                </div>
              </a>
              <a href="https://github.com/waheed816" target="_blank" rel="noopener noreferrer" className="github-link">
                <div className="github-wrapper">
                  <div className="linkedin-github-text">Github</div>
                  <i class="fa-brands fa-github"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
