import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <a href="index.html">
          <h1>ციტატელი</h1>
        </a>
      </div>
      <div className="sidebar_content">
        <ul>
          <li>
            <i className="fa-solid fa-user"></i>
            <FontAwesomeIcon icon={faHouse} />
            <p className="sidebar-texts">მთავარი</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faPerson} />
            <p className="sidebar-texts">ჩვენს შესახებ</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;