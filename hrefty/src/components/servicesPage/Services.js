import Service from "./Service";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "../../style/servicesPage/Services.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  demandesList,
} from "../../redux/Slices/pageServicesSlice";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"السابق"}
      nextLabel={"التالي"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

const Services = () => {
  const dispatch = useDispatch();

  // lancer la liste des services
  const servs = useSelector((state) => state.services.listServices);
  const [listServ, setListServ] = useState([]);
  useEffect(() => {
    dispatch(demandesList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListServ(servs || []);
    console.log(servs);
  }, [servs]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedItems = listServ.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="Services">
    
      <div className="cards">
        {displayedItems.map((service, index) => (
          <Service
            key={index}
            budget={service.budget}
            titre={service.titre}
            description={service.description}
            dateExecution={service.dateExecution}
          />
        ))}
      </div>
      <Pagination
        pageCount={Math.ceil(listServ.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Services;
