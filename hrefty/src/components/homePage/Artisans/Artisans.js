import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "..//..//..//style/homePage/Artisans/Artisans.scss";
import Artisan from "./Artisan";

function Artisans() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
  };
  const artisans = [
    { Nom: "أحمد الحرفي", Profession: "نجار" },
    { Nom: "فاطمة الزهراء", Profession: "خياطة" },
    { Nom: "يوسف الحداد", Profession: "حداد" },
    { Nom: "مريم الطرازي", Profession: "طرّازة" },
    { Nom: "علي البلاطي", Profession: "عامل بلاط" },
    { Nom: "خالد الكهربائي", Profession: "كهربائي" },
    { Nom: "سعيد السباك", Profession: "سبّاك" },
    { Nom: "هشام الدهان", Profession: "دهّان" },
    { Nom: "نورا المصممة", Profession: "مصممة أزياء" },
    { Nom: "حسن الميكانيكي", Profession: "ميكانيكي" },
  ];

  return (
    <div className="Artisans">
      <div className="descreption">
        <h1>~ مجموعة من المهنيين ~</h1>
        <p>
          تعرف على المزيد من المهنيين المحترفين{" "}
          <button className="btn">المزيد</button>
        </p>
      </div>
      <div className="content">
        <Slider {...settings}>
          {artisans.map((artisans, index) => (
            <Artisan
              key={index}
              artisanNom={artisans.Nom}
              artisanProfession={artisans.Profession}
              artisanImg={"imgs/images.jpeg"}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Artisans;
