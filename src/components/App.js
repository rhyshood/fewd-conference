import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import Example from "./Example";
import Login from "./Login";
import Contact from "./Contact";
import Navigation from "./Navigation";
import WhatsOn from "./WhatsOn";


function App() {

    return (
        <BrowserRouter>
        <Navigation />
      <Routes>
        <Route path="/" element={<WhatsOn />} />
        <Route path="/whatson" element={<WhatsOn />} />
        <Route path="/search" element={<Example />} />
        <Route path="login" element= {<Login/>} />
        <Route path="contact" element= {<Contact/>} />
      </Routes>
    </BrowserRouter>

    );
}

export default App;