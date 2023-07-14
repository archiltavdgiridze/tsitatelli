import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faHouse,
  faCircleInfo,
  faWandMagicSparkles,
  faMoon,
  faSun,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../MainComponents/MainCSS/sidebar.css";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    setActiveLink("home");
    setIsMenuOpen(false);
  };

  const handleMenuStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const isMobile = windowWidth > 1100;

  return (
    <div className={`sidebar ${darkMode ? "dark-mode" : ""}`}>
      <div className="sidebar_title">
        <Link to="/" className="sidebar_logo" onClick={handleLogoClick}>
          <h1>ციტატელი</h1>
        </Link>
      </div>
      {isMobile ? (
        <div className="sidebar_content">
          <ul>
            <li>
              <Link
                to="/"
                className={`sidebar-links ${
                  activeLink === "home" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("home")}
                alt="home-button"
              >
                <span>
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                <p className="sidebar-texts">მთავარი</p>
              </Link>
            </li>
            <li>
              <Link
                to="/filter"
                className={`sidebar-links ${
                  activeLink === "filter" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("filter")}
                alt="sources-button"
              >
                <span>
                  <FontAwesomeIcon icon={faFilter} />
                </span>
                <p className="sidebar-texts">ფილტრი</p>
              </Link>
            </li>
            <li>
              <Link
                to="/generator"
                className={`sidebar-links ${
                  activeLink === "generator" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("generator")}
                alt="sources-button"
              >
                <span>
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                </span>
                <p className="sidebar-texts">გენერატორი</p>
              </Link>
            </li>
            <li>
              <Link
                to="/about_us"
                className={`sidebar-links ${
                  activeLink === "about" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("about")}
                alt="about-us-button"
              >
                <span>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </span>
                <p className="sidebar-texts">ჩვენს შესახებ</p>
              </Link>
            </li>
          </ul>
          <div className="dark-mode-toggle">
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <div className="dark_mode_button">
                  <FontAwesomeIcon icon={faSun} className="fa_sun" />
                  <p>დღის რეჟიმი</p>
                </div>
              ) : (
                <div className="dark_mode_button">
                  <FontAwesomeIcon icon={faMoon} className="fa_moon" />
                  <p>ღამის რეჟიმი</p>
                </div>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="sidebar_content">
          <Menu
            right
            animation={"stack"}
            width={"300px"}
            isOpen={isMenuOpen}
            onStateChange={handleMenuStateChange}
            customBurgerIcon={
              <FontAwesomeIcon className="sidebar_menu_bars" icon={faBars} />
            }
            customCrossIcon={
              <FontAwesomeIcon className="sidebar_close_icon" icon={faXmark} />
            }
          >
            <ul>
              <li>
                <Link
                  to="/"
                  className={`sidebar-links ${
                    activeLink === "home" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("home")}
                  alt="home-button"
                >
                  <span>
                    <FontAwesomeIcon icon={faHouse} />
                  </span>
                  <p className="sidebar-texts">მთავარი</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/filter"
                  className={`sidebar-links ${
                    activeLink === "filter" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("filter")}
                  alt="sources-button"
                >
                  <span>
                    <FontAwesomeIcon icon={faFilter} />
                  </span>
                  <p className="sidebar-texts">ფილტრი</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/generator"
                  className={`sidebar-links ${
                    activeLink === "generator" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("generator")}
                  alt="sources-button"
                >
                  <span>
                    <FontAwesomeIcon icon={faWandMagicSparkles} />
                  </span>
                  <p className="sidebar-texts">გენერატორი</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/about_us"
                  className={`sidebar-links ${
                    activeLink === "about" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("about")}
                  alt="about-us-button"
                >
                  <span>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </span>
                  <p className="sidebar-texts">ჩვენს შესახებ</p>
                </Link>
              </li>
            </ul>
            <div className="dark-mode-toggle">
              <button onClick={toggleDarkMode}>
                {darkMode ? (
                  <div className="dark_mode_button">
                    <FontAwesomeIcon icon={faSun} className="fa_sun" />
                    <p>დღის რეჟიმი</p>
                  </div>
                ) : (
                  <div className="dark_mode_button">
                    <FontAwesomeIcon icon={faMoon} className="fa_moon" />
                    <p>ღამის რეჟიმი</p>
                  </div>
                )}
              </button>
            </div>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
