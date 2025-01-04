import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import Example from "./Example";
import Contact from "./Contact";
import Navigation from "./Navigation";


function App() {

    return (
        <BrowserRouter>
        <Navigation />
      <Routes>
        <Route path="/" element={<Example />} />
        <Route path="contact" element= {<Contact/>} />
      </Routes>
    </BrowserRouter>

    );
}

export default App;