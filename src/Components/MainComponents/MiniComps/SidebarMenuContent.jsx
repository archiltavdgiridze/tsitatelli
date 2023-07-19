import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useLocation } from "react-router-dom";

const SidebarMenuContent = ({
  isMenuOpen,
  handleMenuStateChange,
  handleLinkClick,
  activeLink,
  toggleDarkMode,
  darkMode,
  FontAwesomeIcon,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faHouse,
  faFilter,
  faWandMagicSparkles,
  faCircleInfo,
  faMagnifyingGlass,
}) => {
  return (
    <>
      <ul>
        <li>
          <Link
            to="/"
            className={`sidebar-links ${activeLink === "home" ? "active" : ""}`}
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
    </>
  );
};

export default SidebarMenuContent;
