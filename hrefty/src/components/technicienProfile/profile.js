import {
  faCircle,
  faLocationDot,
  faStar,
  faToolbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Navbar from "../homePage/Navbar";
import "../../style/technicienProfile/profile.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvaluation,
  evaluationsList,
  technicienInfo,
} from "../../redux/Slices/profileSlice";
import { useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(technicienInfo(id));
  }, [dispatch]);
  const technicien = useSelector((state) => state.profile.technicienInfo);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [formInputs, setFormInputs] = useState({
    note: "",
    comment: "",
    idClient: user.role == "client" ? user.client.id : user.artisan.id,
    idArtisan: "",
  });
  useEffect(() => {
    if (technicien?.id) {
      setFormInputs((prev) => ({
        ...prev,
        idArtisan: technicien.id,
      }));
    }
  }, [technicien]);

  const handleAdd = () => {
    dispatch(addEvaluation(formInputs));
  };

  useEffect(() => {
    dispatch(evaluationsList());
  }, [dispatch]);
  const comments = useSelector((state) => state.profile.listEvaluations);
  console.log(comments);
  return (
    <div className="technicienProfile">
      <Navbar />
      <div className="content">
        <div className="profile">
          <img src="imgs/images.jpeg" alt="" />
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faUser} />{" "}
              {technicien?.nom}
              {/* محمد الزراد */}
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faLocationDot} />{" "}
              {technicien?.adresse}
            </li>
            <li>
              <FontAwesomeIcon className="icon-actif" icon={faCircle} />{" "}
              {technicien?.status === "actif" ? "مفعل" : "غير مفعل"}
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faToolbox} />{" "}
              {technicien?.specialite?.nom}
            </li>
            <li className="stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </li>
          </ul>
        </div>
        <div className="comments">
          {comments &&
            comments
              .filter((comment) => comment.idArtisan === technicien.id)
              .map((comment) => (
                <div key={comment.id} className="comment">
                  <img src="" alt="" />
                  <div className="comment-content">
                    <div className="client">
                      <p>{comment?.client?.nom}</p>
                      <span>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={
                              i < Number(comment.note)
                                ? faStar
                                : ["far", "star"]
                            }
                          />
                        ))}
                      </span>
                    </div>
                    <p>{comment?.commentaire}</p>
                  </div>
                </div>
              ))}
        </div>

        <div className="addComment">
          <input
            placeholder="قيم الحرفي..."
            className="form-control"
            min="1"
            max="5"
            type="number"
            onChange={(e) =>
              setFormInputs({ ...formInputs, note: e.target.value })
            }
          />
          <input
            placeholder="اضف تعليق..."
            onChange={(e) =>
              setFormInputs({ ...formInputs, comment: e.target.value })
            }
            className="form-control"
            type="text"
          />
          <button onClick={handleAdd} className="btn">
            اضافة
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
