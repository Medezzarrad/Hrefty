import React from "react";
import "..//..//style/servicesPage/Service.scss";

const Service = ({
  serviceImage,
  titre,
  description,
  budget,
  dateExecution,
}) => {
  return (
    <div className="Service">
      <div className="img">
        <img src="imgs/images.jpeg" alt="" />
      </div>
      <div className="content">
        <div className="serviceInfo">
          <p className="budget">{budget} درهم</p>
          <p className="category">{dateExecution}</p>
        </div>
        <h1 className="title">{titre}</h1>
        <p className="description">{description}</p>
      </div>
      <button className="btn">تقديم عرض</button>
    </div>
  );
};

export default Service;
