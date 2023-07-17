import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFilter,
  faWandMagicSparkles,
  faCircleInfo,
  faMoon,
  faSun,
  faBars,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import "../MainComponents/MainCSS/sidebar.css";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  // location hook
  const location = useLocation();
  // sets and stores active link
  const [activeLink, setActiveLink] = useState("");
  // sets and stores menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // sets and stores window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // handles link click and closes menu
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  // handles logo click and closes menu
  const handleLogoClick = () => {
    setActiveLink("home");
    setIsMenuOpen(false);
  };

  // handles menu state change and sets isMenuOpen state
  const handleMenuStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  // handles window resize and sets windowWidth state
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // sets windowWidth state on window resize
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveLink(currentPath === "/" ? "home" : currentPath.substr(1));
  }, [location]);

  const isMobile = windowWidth > 1200;

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
                alt="filter-button"
              >
                <span>
                  <FontAwesomeIcon icon={faFilter} />
                </span>
                <p className="sidebar-texts">ფილტრი</p>
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={`sidebar-links ${
                  activeLink === "search" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("search")}
                alt="search-button"
              >
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <p className="sidebar-texts">ძიება</p>
              </Link>
            </li>
            <li>
              <Link
                to="/generator"
                className={`sidebar-links ${
                  activeLink === "generator" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("generator")}
                alt="generator-button"
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
                  activeLink === "about_us" ? "active" : ""
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
            // animation={"stack"}
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
                  to="/search"
                  className={`sidebar-links ${
                    activeLink === "search" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("search")}
                  alt="search-button"
                >
                  <span>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                  <p className="sidebar-texts">ძიება</p>
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
                {/* <Link
                  to="/about_us"
                  className={`sidebar-links ${
                    activeLink === "about" ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick("about")}
                  alt="about-us-button"
                > */}
                <Link
                  to="/about_us"
                  className={`sidebar-links ${
                    activeLink === "about_us" ? "active" : ""
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
