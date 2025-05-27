import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "..//..//style/clientDashboard/dashboardSlider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faEnvelopeOpenText,
  faFileImport,
  faCog,
  faRightFromBracket,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Button, Modal } from "react-bootstrap";
import { addDemande } from "../../redux/Slices/clientSlice";
import { NavLink } from "react-router-dom";

const DashboardSlider = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  //demande Information
  const [formInputs, setFormIntputs] = useState({
    titre: "",
    description: "",
    adresse: "",
    budget: 0,
    telephone: "",
    photo: null,
    dateExecution: "",
    status: "en_attente",
    idClient: 1,
  });

  const handleAddDemande = () => {
    setShow(false);
    dispatch(addDemande(formInputs));
  };

  return (
    <div className="dashboardSlider">
      <div className="sliderTop">
        <img src="imgs/images.jpeg" />
        <h1>الاسم</h1>
      </div>
      <div className="sliderMiddle">
        <NavLink className="btn" to="/client_panel">
          <div className="icon">
            <FontAwesomeIcon icon={faHome} className="ml-2" />
          </div>
          <div className="text">الرئيسية</div>
        </NavLink>
        <NavLink className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faFileImport} className="ml-2" />
          </div>
          <div onClick={() => setShow(true)} className="text">
            رفع طلب
          </div>
          <form
            enctype="multipart/form-data"
            onSubmit={(e) => e.preventDefault()}
          >
            <Modal
              size="lg"
              scrollable
              show={show}
              onHide={() => setShow(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>رفع طلب</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <span>العنوان:</span>
                    <input
                      onChange={(e) =>
                        setFormIntputs({ ...formInputs, titre: e.target.value })
                      }
                      className="form-control"
                      type="text"
                    />
                  </li>
                  <li class="list-group-item">
                    <span>الوصف:</span>
                    <textarea
                      onChange={(e) =>
                        setFormIntputs({
                          ...formInputs,
                          description: e.target.value,
                        })
                      }
                      className="form-control"
                      cols="30"
                      rows="5"
                    ></textarea>
                  </li>
                  <li class="list-group-item">
                    <span>الميزانية:</span>
                    <input
                      onChange={(e) =>
                        setFormIntputs({
                          ...formInputs,
                          budget: e.target.value,
                        })
                      }
                      min={1}
                      className="form-control"
                      type="number"
                    />
                  </li>
                  <li class="list-group-item">
                    <span>رقم الهاتف:</span>
                    <input
                      onChange={(e) =>
                        setFormIntputs({
                          ...formInputs,
                          telephone: e.target.value,
                        })
                      }
                      className="form-control"
                      type="text"
                    />
                  </li>
                  <li class="list-group-item">
                    <span>صورة:</span>
                    <input
                      onChange={(e) =>
                        setFormIntputs({
                          ...formInputs,
                          photo: e.target.files[0],
                        })
                      }
                      accept="image/*"
                      className="form-control"
                      type="file"
                    />
                  </li>
                  <li class="list-group-item">
                    <span>الوقت المفضل:</span>
                    <input
                      onChange={(e) =>
                        setFormIntputs({
                          ...formInputs,
                          dateExecution: e.target.value,
                        })
                      }
                      className="form-control"
                      type="date"
                    />
                  </li>
                  <li class="list-group-item">
                    <span>الموقع:</span>
                    <input
                      onChange={(e) =>
                        setFormIntputs({
                          ...formInputs,
                          adresse: e.target.value,
                        })
                      }
                      className="form-control"
                      type="text"
                    />
                  </li>
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  إغلاق
                </Button>
                <Button variant="primary" onClick={handleAddDemande}>
                  رفع
                </Button>
              </Modal.Footer>
            </Modal>
          </form>
        </NavLink>
        <NavLink className="btn" to="/client_panel/chat">
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

export default DashboardSlider;
