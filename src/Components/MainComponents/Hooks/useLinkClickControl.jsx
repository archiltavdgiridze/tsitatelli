import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const useLinkClickControl = () => {
  // location hook
  const location = useLocation();
  // sets and stores active link
  const [activeLink, setActiveLink] = useState("");
  // sets and stores menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveLink(currentPath === "/" ? "home" : currentPath.substr(1));
  }, [location]);

  return {
    activeLink,
    isMenuOpen,
    handleLinkClick,
    handleLogoClick,
    handleMenuStateChange,
  };
};

export default useLinkClickControl;
