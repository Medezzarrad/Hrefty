import React from "react";
import "..//..//style/artisansPage/Artisan.scss";

const Artisan = ({
  nom,
  specialite,
  description,
  status,
}) => {
  return (
    <div className="artisan">
      <img src="imgs/images.jpeg" />
      <div className="content">
        <div className="title">
          <h1>{nom}</h1>
          <p>{specialite}</p>
        </div>
        <p className="datecreation">{status}</p>
        <p className="description">{description}</p>
        <button className="btn">تقديم طلب</button>
      </div>
    </div>
  );
};

export default Artisan;
