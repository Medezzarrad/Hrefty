import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Button, Modal } from "react-bootstrap";
import "..//..//..//style/clientDashboard/dashboardPages/overview.scss";
import { demandesList, lastArtisans } from "../../../redux/Slices/clientSlice";

const OverviewClient = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  // lancer la liste des last artisans
  useEffect(() => {
    dispatch(lastArtisans());
  }, [dispatch]);
  const lastArts = useSelector((state) => state.client.lastArtisans);
  console.log(lastArts);

  // lanver la liste des demandes
  useEffect(() => {
    dispatch(demandesList());
  }, [dispatch]);
  const listDemandes = useSelector((state) => state.client.listDemandes);

  return (
    <div className="clientOverview">
      <div className="header">
        <h1>آخر الحرفيين الذين تعاملت معهم</h1>
        <div className="artisans">
          {lastArts &&
            lastArts.map((artisan) => (
              <div className="artisan">
                <img src="imgs/images.jpeg" alt="" />
                <ul>
                  <li>
                    <span>الاسم: </span>
                    {artisan.nom}
                  </li>
                  <li>
                    <span>التخصص: </span>
                    {artisan.specialite.nom}
                  </li>
                  <li>
                    <span>رقم الهاتف: </span>
                    {artisan.telephone}
                  </li>
                  <li>
                    <span>الحالة: </span>
                    {artisan.status}
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
      <div className="statistics">
        <p>
          مجموع العروض : <span>0</span>
        </p>
        <p>
          العروض المقبولة : <span>0</span>
        </p>
        <p>
          العروض المعلقة : <span>0</span>
        </p>
        <p>
          العروض المرفوضة : <span>0</span>
        </p>
      </div>

      <div className="demandesList">
        {listDemandes &&
          listDemandes
            .filter((demande) => demande.status == "en_attente")
            .map((demande) => (
              <div className="demande">
                <img src="imgs/images.jpeg" alt="" />
                <ul>
                  <li>
                    <span>العنوان:</span> <p>{demande.titre}</p>
                  </li>
                  <li>
                    <span>الموقع:</span> <p>{demande.adresse}</p>
                  </li>
                  <li>
                    <span>الميزانية:</span> <p>{demande.budget}</p>
                  </li>
                  <li>
                    <span>تاريخ الرفع:</span> <p>{demande.dateCreation}</p>
                  </li>
                </ul>
              </div>
            ))}
      </div>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="true"
              aria-controls="flush-collapseOne"
            >
              العروض المقبولة
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionFlushExample"
          >
            {listDemandes &&
              listDemandes
                .filter((demande) => demande.status === "en_cours")
                .map((demande) => {
                  const offresAcceptables = demande.offres?.filter(
                    (offre) => offre.statut === "acceptable"
                  );

                  if (!offresAcceptables || offresAcceptables.length === 0) {
                    return null;
                  }

                  return (
                    <div className="accordion-body" key={demande.id}>
                      <table className="table table-bordered text-center table-hover m-0">
                        <thead>
                          <tr>
                            <th>وصف العرض</th>
                            <th>الحرفي</th>
                            <th>ميزانية العرض</th>
                            <th>الاجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offresAcceptables.map((offre, index) => (
                            <tr key={index}>
                              <td>{offre.description || "—"}</td>
                              <td>{offre.artisan?.nom || "—"}</td>
                              <td>{offre.montant || "—"}</td>
                              <td>
                                <Dropdown>
                                  <Dropdown.Toggle variant="secondary">
                                    المزيد
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu variant="dark">
                                    <Dropdown.Item>
                                      <button
                                        onClick={() => setShow(true)}
                                        className="btn"
                                      >
                                        عرض تفاصيل العرض
                                      </button>
                                      <Modal
                                        show={show}
                                        onHide={() => setShow(false)}
                                        centered
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title>
                                            تفاصيل العرض
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                              <span>عنوان الطلب:</span>{" "}
                                              {demande.titre}
                                            </li>
                                            <li className="list-group-item">
                                              <span>وصف العرض:</span>{" "}
                                              {offre.description}
                                            </li>
                                            <li className="list-group-item">
                                              <span>ميزانية العرض:</span>{" "}
                                              {offre.montant}
                                            </li>
                                            <li className="list-group-item">
                                              <span>الحرفي:</span>{" "}
                                              {offre.artisan?.nom}
                                            </li>
                                            <li className="list-group-item">
                                              <span>تاريخ رفع العرض:</span>{" "}
                                              {offre.dateCreation}
                                            </li>
                                          </ul>
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button
                                            variant="secondary"
                                            onClick={() => setShow(false)}
                                          >
                                            إغلاق
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="btn">
                                      <button className="btn">
                                        تعليق العرض
                                      </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="btn">
                                      <button className="btn">رفض العرض</button>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="true"
              aria-controls="flush-collapseOne"
            >
              العروض المعلقة
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionFlushExample"
          >
            {listDemandes &&
              listDemandes
                .filter((demande) => demande.status === "en_attente")
                .map((demande) => {
                  const offresEnCours = demande.offres?.filter(
                    (offre) => offre.statut === "en attente"
                  );

                  if (!offresEnCours || offresEnCours.length === 0) {
                    return null;
                  }

                  return (
                    <div className="accordion-body" key={demande.id}>
                      <table className="table table-bordered text-center table-hover m-0">
                        <thead>
                          <tr>
                            <th>وصف العرض</th>
                            <th>الحرفي</th>
                            <th>ميزانية العرض</th>
                            <th>الاجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offresEnCours.map((offre, index) => (
                            <tr key={index}>
                              <td>{offre.description || "—"}</td>
                              <td>{offre.artisan?.nom || "—"}</td>
                              <td>{offre.montant || "—"}</td>
                              <td>
                                <Dropdown>
                                  <Dropdown.Toggle variant="secondary">
                                    المزيد
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu variant="dark">
                                    <Dropdown.Item>
                                      <button
                                        onClick={() => setShow(true)}
                                        className="btn"
                                      >
                                        عرض تفاصيل العرض
                                      </button>
                                      <Modal
                                        show={show}
                                        onHide={() => setShow(false)}
                                        centered
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title>
                                            تفاصيل العرض
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                              <span>عنوان الطلب:</span>{" "}
                                              {demande.titre}
                                            </li>
                                            <li className="list-group-item">
                                              <span>وصف العرض:</span>{" "}
                                              {offre.description}
                                            </li>
                                            <li className="list-group-item">
                                              <span>ميزانية العرض:</span>{" "}
                                              {offre.montant}
                                            </li>
                                            <li className="list-group-item">
                                              <span>الحرفي:</span>{" "}
                                              {offre.artisan?.nom}
                                            </li>
                                            <li className="list-group-item">
                                              <span>تاريخ رفع العرض:</span>{" "}
                                              {offre.dateCreation}
                                            </li>
                                          </ul>
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button
                                            variant="secondary"
                                            onClick={() => setShow(false)}
                                          >
                                            إغلاق
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="btn">
                                      <button className="btn">
                                        تعليق العرض
                                      </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="btn">
                                      <button className="btn">رفض العرض</button>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewClient;
