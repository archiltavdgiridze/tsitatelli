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
            {/* <a href="index.html"> */}
              <i class="fa-solid fa-user"></i>
              <FontAwesomeIcon icon={faHouse} />
              <p className="sidebar-texts">მთავარი</p>
            {/* </a> */}
          </li>
          {/*<li>
            <a href="">
              <i data-feather="filter"></i>
              ფილტრი
            </a>
          </li>*/}
          <li>
            {/* <a href="about_us.html"> */}
              <FontAwesomeIcon icon={faPerson} />

              <p className="sidebar-texts">ჩვენს შესახებ</p>
            {/* </a> */}
          </li>
          {/*<li>
            <a href="contact.html">
              <i data-feather="phone"></i>
              კონტაქტი
            </a>
          </li>*/}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
