import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <Link to="/" className="sidebar_logo">
          <h1>ციტატელი</h1>
        </Link>
      </div>
      <div className="sidebar_content">
        <ul>
          <li>
            <Link to="/" className="sidebar-links">
              <span>
                <FontAwesomeIcon icon={faHouse} />
              </span>
              <p className="sidebar-texts">მთავარი</p>
            </Link>
          </li>
          <li>
            <Link to="/filter_by_authors" className="sidebar-links">
              <span>
                <FontAwesomeIcon icon={faPerson} />
              </span>
              <p className="sidebar-texts">ავტორები</p>
            </Link>
          </li>
          <li>
            <Link to="/about_us" className="sidebar-links">
              <span>
                <FontAwesomeIcon icon={faPerson} />
              </span>
              <p className="sidebar-texts">ჩვენს შესახებ</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
