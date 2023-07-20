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
import useLinkClickControl from "../Hooks/ForMain/useLinkClickControl";
import SidebarMenuContent from "./MiniComps/SidebarMenuContent";
import { slide as Menu } from "react-burger-menu";

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
        <nav className="sidebar_content">
          <SidebarMenuContent
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
        </nav>
      ) : (
        <nav className="sidebar_content">
          <Menu
            right
            // stack
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
            <SidebarMenuContent
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
          </Menu>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
