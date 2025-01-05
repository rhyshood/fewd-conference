import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import Login from "./Login";
import Contact from "./Contact";
import Navigation from "../bars/Navigation";
import WhatsOn from "./WhatsOn";
import Search from "./Search";


function App() {

    return (
        <BrowserRouter>
        <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/whatson" />} />
        <Route path="/whatson" element={<WhatsOn />} />
        <Route path="/search" element={<Search />} />
        <Route path="login" element= {<Login/>} />
        <Route path="contact" element= {<Contact/>} />
      </Routes>
    </BrowserRouter>

    );
}

export default App;