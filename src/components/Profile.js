import React, { useState } from "react";
import ProfileBar from "../bars/ProfileBar";
import AccountSettings from "./AccountSettings";
import "./../styles/Profile.css";
import "./../styles/Main.css";

function Profile({loggedInEmail, setloggedInEmail}) {

    const [activePage, setActivePage] = useState(1);

    if (activePage === 1){
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage} setloggedInEmail={setloggedInEmail}/>
                <AccountSettings loggedInEmail={loggedInEmail}/>
            </div>
        );
    } else if (activePage === 2){
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage}/>
            </div>
        );
    } else {
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage}/>
            </div>
        );
    }
}

export default Profile;