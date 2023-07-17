import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import "../MainComponents/MainCSS/sidebar.css";
import useLinkClickControl from "./MiniComps/useLinkClickControl";
// SidebarMenuMobile needs to be matched to this component's html structure
import SidebarMenuMobile from "./MiniComps/SidebarMenuMobile";

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const {
    activeLink,
    isMenuOpen,
    handleLinkClick,
    handleLogoClick,
    handleMenuStateChange,
  } = useLinkClickControl();

  // sets and stores window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
          <SidebarMenuMobile
            isMenuOpen={isMenuOpen}
            handleMenuStateChange={handleMenuStateChange}
            handleLinkClick={handleLinkClick}
            activeLink={activeLink}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
            FontAwesomeIcon={FontAwesomeIcon}
            faBars={faBars}
            faXmark={faXmark}
            faSun={faSun}
            faMoon={faMoon}
            faHouse={faHouse}
            faFilter={faFilter}
            faWandMagicSparkles={faWandMagicSparkles}
            faCircleInfo={faCircleInfo}
            faMagnifyingGlass={faMagnifyingGlass}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
