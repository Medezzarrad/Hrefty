import React from 'react'
// import "..//..//style/artisanDashboard/artisanDashboard.scss";
// import ArtisanSlider from './artisanSlider';
// import Overview from './dashboardPages/overview';
import AdminSlider from './adminSlider';
import Techniciens from './dashboardPages/techniciens';
import Demandes_offres from './dashboardPages/demandes_offres';
// import Chat from '../chat/chat';

const AdminDashboard = () => {
  return (
    <div className='artisanDashboard'>
      <AdminSlider/>

      <Demandes_offres/>
      {/* <Techniciens/> */}
    </div>
  )
}

export default AdminDashboard;
