import React from "react";
import "..//..//..//style/homePage/Artisans/Artisan.scss";

const Artisan = ({ artisanNom, artisanProfession, artisanImg }) => {
  return (
    <div className="Artisan">
      <img src={artisanImg} />
      <div className="content">
        <h1>{artisanNom}</h1>
        <p>{artisanProfession}</p>
      </div>
    </div>
  );
};

export default Artisan;
