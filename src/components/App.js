import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "../styles/Main.css";
import Login from "./Login";
import Contact from "./Contact";
import Navigation from "../bars/Navigation";
import WhatsOn from "./WhatsOn";
import Search from "./Search";
import Profile from "./Profile";
import { useLocalStorage } from '../components/useLocalStorage';


function App() {
    const [loggedInEmail, setLoggedInEmail] = useLocalStorage("loggedInEmail", "");
    return (
        <BrowserRouter>
        <Navigation loggedInEmail = { loggedInEmail }/>
        <div class="action-area">
      <Routes>
        <Route path="/" element={<Navigate to="/whatson" />} />
        <Route path="/whatson" element={<WhatsOn loggedInEmail={loggedInEmail}/>} />
        <Route path="/search" element={<Search />} />
        <Route path="login" element= {loggedInEmail !== "" ? <Navigate to="/profile" /> : <Login setLoggedInEmail={setLoggedInEmail}/>} />
        <Route path="profile" element= {loggedInEmail === "" ? <Navigate to="/login" /> : <Profile loggedInEmail={loggedInEmail} setLoggedInEmail={setLoggedInEmail}/>} />
        <Route path="contact" element= {<Contact/>} />
      </Routes>
      </div>
    </BrowserRouter>

    );
}

export default App;