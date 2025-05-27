import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import Artisan from "./Artisan";
import "..//..//style/artisansPage/Artisans.scss";
import { useDispatch, useSelector } from "react-redux";
import { artisansList } from "../../redux/Slices/pageArtisansSlice";
// import { artisansList } from '../../redux/Slices/artisansSlice';

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
const Artisans = () => {
  const dispatch = useDispatch();

  // lancer la liste des artisans
  const artisans = useSelector((state) => state.artisans.listArtisans);
  const [listArtisans, setListArtisans] = useState([]);
  useEffect(() => {
    dispatch(artisansList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListArtisans(artisans || []);
    console.log(artisans);
  }, [artisans]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedItems = listArtisans.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <div className="artisans">
      <div className="cards">
        {displayedItems.map((artisan, index) => (
          <Artisan
            key={index}
            nom={artisan.nom}
            description={artisan.description}
            specialite={artisan.specialite.nom}
            status={artisan.status}
          />
        ))}
      </div>
      <Pagination
        className="pagination"
        pageCount={Math.ceil(artisansList.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Artisans;
