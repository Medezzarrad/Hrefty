import React from "react";
import "..//..//style/artisanDashboard/artisanSlider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCheckCircle,
  faFileImport,
  faCog,
  faRightFromBracket,
  faReceipt,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const ArtisanSlider = () => {
  return (
    <div className="artisanSlider">
      <div className="sliderRight">
        <img src="imgs/images.jpeg" />
        <h1>الاسم</h1>
      </div>
      <div className="sliderLeft">
        <NavLink to="/technicien_panel" className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faHome} className="ml-2" />
          </div>
          <div className="text">الرئيسية</div>
        </NavLink>
        <NavLink to="/technicien_panel/chat" className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faComment} className="ml-2" />
          </div>
          <div className="text">المحادثات</div>
        </NavLink>
        <NavLink className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faCog} className="ml-2" />
          </div>
          <div className="text">اعدادات الحساب</div>
        </NavLink>
        <NavLink className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
          </div>
          <div className="text">تسجيل الخروج</div>
        </NavLink>
      </div>
    </div>
  );
};

export default ArtisanSlider;
