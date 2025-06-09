import React from "react";
import Navbar from "./components/homePage/Navbar";
import SignCards from "./components/homePage/signCards/signCards";
import HomeSection from "./components/homePage/homeSection";
import Search from "./components/homePage/Search";
import ServiceCards from "./components/homePage/serviceCards/serviceCards";
import Features from "./components/homePage/Features/Features";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArtisansPage from "./components/artisansPage/Artisans";
import Steps from "./components/homePage/Steps/Steps";
import Footer from "./components/homePage/Footer";
import WebFont from "webfontloader";
import Services from "./components/servicesPage/Services";
import NewDemandePage from "./components/newOffrePage/newOffrePage";
import ClientDashboard from "./components/clientDashboard/clientDashboard";
import ArtisanDashboard from "./components/artisanDashboard/artisanDashboard";
import AdminDashboard from "./components/adminDashboard/adminDashboard";
import Register from "./components/authPages/registerClient";
import Chat from "./components/chat/chat";
import OverviewClient from "./components/clientDashboard/dashboardPages/overview";
import OverviewTechnicien from "./components/artisanDashboard/dashboardPages/overview";
import RegisterTechnicien from "./components/authPages/registerTechnicien";
import Login from "./components/authPages/Login";
import RegisterClient from "./components/authPages/registerClient";
import Techniciens from "./components/adminDashboard/dashboardPages/techniciens";
import Demandes_offres from "./components/adminDashboard/dashboardPages/demandes_offres";
import Overview from "./components/adminDashboard/dashboardPages/overview";
import Profile from "./components/technicienProfile/profile";
import Artisans from "./components/homePage/Artisans/Artisans";

const Acceuil = () => {
  return (
    <div style={{ fontFamily: "Tajawal" }}>
      <Navbar />
      <SignCards />
      <HomeSection />
      {/* <ServiceCards /> */}
      <Features />
      <Artisans />
      <Steps />
      <Footer />
    </div>
  );
};
const ServicesPage = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <Navbar />

      <Services />
      <Footer />
    </div>
  );
};
const TechniciensPage = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <Navbar />

      <ArtisansPage />
      <Footer />
    </div>
  );
};
const RegisterPage = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <Register />
    </div>
  );
};
const DashboardClient = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <ClientDashboard />
    </div>
  );
};
const DashboardTechnicien = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <ArtisanDashboard />
    </div>
  );
};
const DashboardAdmin = () => {
  return (
    <div style={{ fontFamily: "Tajawal, sans-serif" }}>
      <AdminDashboard />
    </div>
  );
};

const RoleRoute = ({ allowedRole, children }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (allowedRole == "admin") {
    return children;
  }
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  WebFont.load({
    google: {
      families: ["Tajawal:200,300,400,500,600,700,800,900", "sans-serif"],
    },
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/techniciens" element={<TechniciensPage />} />
        <Route path="/register_technicien" element={<RegisterTechnicien />} />
        <Route path="/register_client" element={<RegisterClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/admin_panel"
          element={
            <RoleRoute allowedRole="admin">
              <AdminDashboard />
            </RoleRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="demandes_offres" element={<Demandes_offres />} />
          <Route path="techniciens" element={<Techniciens />} />
        </Route>
        ²
        <Route
          path="/client_panel"
          element={
            <RoleRoute allowedRole="client">
              <DashboardClient />
            </RoleRoute>
          }
        >
          <Route index element={<OverviewClient />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route
          path="/technicien_panel"
          element={
            <RoleRoute allowedRole="technicien">
              <DashboardTechnicien />
            </RoleRoute>
          }
        >
          <Route index element={<OverviewTechnicien />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
