import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../style/artisanDashboard/dashboardPages/overview.scss";
import {
  faBell,
  faBriefcase,
  faCircle,
  faClipboardCheck,
  faComment,
  faLocationDot,
  faPaperPlane,
  faStar,
  faToolbox,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  addOffre,
  demandesList,
  offresList,
  technicienInfo,
} from "../../../redux/Slices/artisanSlice";
import {
  createConversation,
  fetchMessages,
  setSelectedConversation,
} from "../../../redux/Slices/chatSlice";

const OverviewTechnicien = () => {
  const [show, setShow] = useState(false);
  const [offreAdd, setOffreAdd] = useState(false);
  const [formInputs, setFormInputs] = useState({
    description: "",
    montant: 0,
    statut: "inacceptable",
    idDemande: 0,
    idArtisan: 0,
  });

  const [client, setClient] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const artisanInfo = useSelector((state) => state.artisan.artisanInfo);
  const listOffres = useSelector((state) => state.artisan.listOffres);
  const listDemandes = useSelector((state) => state.artisan.listDemandes);
  const conversations = useSelector((state) => state.chat.conversations);

  useEffect(() => {
    dispatch(offresList());
    dispatch(demandesList());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClientShow = (clientId) => {
    handleShow();
    for (const artisan of listOffres) {
      for (const offre of artisan.offres) {
        if (offre.demande?.client?.id === clientId) {
          setClient(offre.demande.client);
          return;
        }
      }
    }
  };

  const handleAddOffre = async (idDmnd) => {
    const newFormInputs = {
      ...formInputs,
      idDemande: idDmnd,
      idArtisan: artisanInfo.id,
    };
    setFormInputs(newFormInputs);
    dispatch(addOffre(newFormInputs));
    setOffreAdd(false);
  };

  const openChat = async (offre, clientId, nomClient) => {
    let conv = conversations.find((c) => c.idOffre === offre.id);

    if (!conv) {
      const action = await dispatch(createConversation({ idOffre: offre.id }));

      // 👇 Corriger ici
      if (action.payload) {
        conv = action.payload;
      } else {
        console.error("Échec de création de la conversation");
        return;
      }
    }

    console.log("Conversation ouverte :", conv);

    dispatch(
      setSelectedConversation({
        ...conv,
        nomAutreUtilisateur: nomClient,
        autreUserId: clientId,
        expediteurType: user.role,
      })
    );

    dispatch(fetchMessages(conv.id));

    // ✅ Navigation recommandée avec React Router
    navigate("/technicien_panel/chat"); // Assure-toi d'avoir useNavigate()

    // ❌ Sinon, navigation forcée (rechargement de page complet)
    // window.location.href = 'http://localhost:3000/technicien_panel/chat';
  };

  return (
    <div className="artisanOverview">
      <div className="header">
        <div className="profile">
          <img src="imgs/images.jpeg" alt="" />
          <ul>
            <li>
              <FontAwesomeIcon className="icon" icon={faUser} />{" "}
              {artisanInfo.artisan?.nom}
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faLocationDot} />{" "}
              {artisanInfo.artisan?.adresse} - {artisanInfo.artisan?.ville}
            </li>
            <li>
              <FontAwesomeIcon className="icon-actif" icon={faCircle} />{" "}
              {artisanInfo.artisan?.status === "actif" ? "مفعل" : "غير مفعل"}
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faToolbox} />{" "}
              {artisanInfo.artisan?.specialite?.nom}
            </li>
            <li className="stars">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </li>
          </ul>
        </div>

        <div className="statistiques">
          <div className="row">
            <p>
              <FontAwesomeIcon icon={faClipboardCheck} /> الطلبات النشطة:
              <span>0</span>
            </p>
          </div>
          <div className="row">
            <p>
              <FontAwesomeIcon icon={faPaperPlane} /> العروض المرسلة:
              <span>0</span>
            </p>
          </div>
          <div className="row">
            <p>
              <FontAwesomeIcon icon={faBriefcase} /> الطلبات المنجزة:
              <span>0</span>
            </p>
          </div>
          <div className="row">
            <p>
              <FontAwesomeIcon icon={faComment} /> الرسائل المعلقة:
              <span>0</span>
            </p>
          </div>
        </div>

        <div className="header-left">
          <h1>الطلبات المقبولة</h1>
          <div className="demandesAccept">
            {listOffres
              .filter((artisan) => artisan.user?.id === artisanInfo.id)
              .flatMap((artisan) =>
                artisan.offres
                  .filter(
                    (offre) =>
                      offre.statut === "acceptable" &&
                      offre.demande?.status === "en_cours"
                  )
                  .map((offre, idx) => (
                    <div className="demande" key={idx}>
                      <ul>
                        <li>
                          <img src="imgs/images.jpeg" alt="" />
                        </li>
                        <li>
                          <span>المشكل: </span>
                          {offre.demande?.titre || "—"}
                        </li>
                        <li>
                          <span>الوصف: </span>
                          {offre.demande?.description || "—"}
                        </li>
                        <li>
                          <span>الميزانية: </span>
                          {offre.demande?.budget || "—"}
                        </li>
                        <li>
                          <span>الموقع: </span>
                          {offre.demande?.adresse || "—"}
                        </li>
                      </ul>
                      <button
                        className="btn"
                        onClick={() =>
                          handleClientShow(offre.demande?.client?.id)
                        }
                      >
                        معلومات العميل
                      </button>
                    </div>
                  ))
              )}
          </div>
        </div>
      </div>

      {/* Liste des demandes programmées à Fès sans offre acceptable */}
      <div className="orderList">
        <table className="table table-bordered text-center table-hover m-0">
          <thead>
            <tr>
              <th>الصورة</th>
              <th>المشكل</th>
              <th>الوصف</th>
              <th>الميزانية</th>
              <th>الموقع</th>
              <th>معلومات العميل</th>
              <th>المزيد</th>
            </tr>
          </thead>
          <tbody>
            {listDemandes &&
              listDemandes.map((demande, index) => {
                const isProgrammation = demande.category?.nom === "البرمجة";
                const isInFes = demande.ville === "فاس";
                const hasAcceptableOffre = demande.offres?.some(
                  (offre) => offre.statut === "acceptable"
                );

                if (isProgrammation && isInFes && !hasAcceptableOffre) {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`imgs/${demande.photo || "images.jpeg"}`}
                          alt=""
                        />
                      </td>
                      <td>{demande.titre}</td>
                      <td>{demande.description}</td>
                      <td>{demande.budget}</td>
                      <td>{demande.adresse}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => handleClientShow(demande.client?.id)}
                        >
                          عرض المعلومات
                        </button>
                      </td>
                      <td>
                        <Button onClick={() => setOffreAdd(true)}>
                          ارسال عرض
                        </Button>

                        <Modal
                          size="lg"
                          scrollable
                          show={offreAdd}
                          onHide={() => setOffreAdd(false)}
                          centered
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>رفع طلب</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <span>الوصف:</span>
                                <textarea
                                  className="form-control"
                                  rows="5"
                                  onChange={(e) =>
                                    setFormInputs({
                                      ...formInputs,
                                      description: e.target.value,
                                    })
                                  }
                                ></textarea>
                              </li>
                              <li className="list-group-item">
                                <span>الميزانية:</span>
                                <input
                                  type="number"
                                  className="form-control"
                                  onChange={(e) =>
                                    setFormInputs({
                                      ...formInputs,
                                      montant: e.target.value,
                                    })
                                  }
                                />
                              </li>
                            </ul>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={() => setOffreAdd(false)}
                            >
                              إغلاق
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => handleAddOffre(demande.id)}
                            >
                              رفع
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
          </tbody>
        </table>
      </div>

      {/* Liste des offres acceptées */}
      <div className="orderList">
        <table className="table table-bordered text-center table-hover m-0">
          <thead>
            <tr>
              <th>المشكل</th>
              <th>الوصف</th>
              <th>الميزانية</th>
              <th>معلومات العميل</th>
              <th>اجراء</th>
            </tr>
          </thead>
          <tbody>
            {listOffres &&
              listOffres
                .filter((artisan) => artisan.user?.id === artisanInfo.id)
                .flatMap((artisan) =>
                  artisan.offres
                    .filter((offre) => offre.statut === "acceptable")
                    .map((offre, index) => (
                      <tr key={index}>
                        <td>{offre.demande?.titre}</td>
                        <td>{offre.description}</td>
                        <td>{offre.montant}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={() =>
                              handleClientShow(offre.demande?.client?.id)
                            }
                          >
                            عرض المعلومات
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={() =>
                              openChat(
                                offre,
                                offre.demande?.client?.id,
                                offre.demande?.client?.nom
                              )
                            }
                          >
                            مراسلة العميل
                          </button>
                        </td>
                      </tr>
                    ))
                )}
          </tbody>
        </table>
      </div>

      {/* Modal client info */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>معلومات العميل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="clientInfo">
            <img src="dd" alt="" />
            <ul>
              <li>الاسم: {client.nom}</li>
              <li>الهاتف: {client.telephone}</li>
              <li>الايميل: {client.email}</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            اغلاق
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OverviewTechnicien;
