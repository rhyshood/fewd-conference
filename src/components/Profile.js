import React, { useState, useEffect } from "react";
import ProfileBar from "../bars/ProfileBar";
import AccountSettings from "./AccountSettings";
import "./../styles/Profile.css";
import "./../styles/Main.css";
import SavedTalk from "./TalkViews/SavedTalk";
import EmptyTalk from "./TalkViews/EmptyTalk";
import { GetSavedIDs } from "./DBController";

function Profile({loggedInEmail, setloggedInEmail}) {
    const [listofSavedIDs, setSavedList] = useState([]);
    const {savedTalkStatus, savedTalks} = GetSavedIDs("R@R.com");
    useEffect(() => {
        if (savedTalkStatus === "fetched" && savedTalks.length > 0) {
            setSavedList(savedTalks[0].saved); // Assuming saved[row] has the ID you want
        }
      }, [savedTalkStatus, savedTalks, setSavedList]);

      const [activePage, setActivePage] = useState(1);

    if (activePage === 1){
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage} setloggedInEmail={setloggedInEmail}/>
                <AccountSettings loggedInEmail={loggedInEmail}/>
            </div>
        );
    } else if (activePage === 2){
        return(
        <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage}/>
                <div class="main-container saved">
                {savedTalkStatus === "fetched" ? listofSavedIDs.map((savedID, index) => (
                <SavedTalk TalkID={savedID}/>
            )) : null}
            </div>
        </div>)
    } else {
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage}/>
                <div class="main-container">
                    <ItineraryTalk timeTalk={"9:00"} loggedInEmail={loggedInEmail}/>
                    <ItineraryTalk timeTalk={"10:30"} loggedInEmail={loggedInEmail}/>
                    <ItineraryTalk timeTalk={"12:00"} loggedInEmail={loggedInEmail}/>
                    <ItineraryTalk timeTalk={"14:00"} loggedInEmail={loggedInEmail}/>
                    <ItineraryTalk timeTalk={"15:30"} loggedInEmail={loggedInEmail}/>
                </div>
            </div>
        );
    }
}

export default Profile;