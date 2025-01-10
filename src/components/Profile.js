import React, { useState, useEffect } from "react";
import ProfileBar from "../bars/ProfileBar";
import AccountSettings from "./AccountSettings";
import "./../styles/Profile.css";
import "./../styles/Main.css";
import SavedTalk from "./TalkViews/SavedTalk";
import ItineraryTalk from "./TalkViews/ItineraryTalk";
import EmptyCollection from "./TalkViews/EmptyCollection";
import { GetAccountInfo } from "./DBController";

function Profile({loggedInEmail, setLoggedInEmail}) {
    console.log("we" + loggedInEmail)
    const [listofSavedIDs, setMasterSavedList] = useState([]);
    const {accountInfoStatus, accountInfo} = GetAccountInfo(loggedInEmail);
    useEffect(() => {
        if (accountInfoStatus === "fetched" && accountInfo.length > 0) {
            setMasterSavedList(accountInfo[0].saved); 
        }
      }, [accountInfoStatus, accountInfo]);

    const [activePage, setActivePage] = useState(1);
    if (activePage === 1){
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage} setLoggedInEmail={setLoggedInEmail}/>
                <AccountSettings loggedInEmail={loggedInEmail}/>
            </div>
        );
    } else if (activePage === 2){
        return(
        <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage} setLoggedInEmail={setLoggedInEmail}/>
                <div class="main-container saved">
                    <div class="saved-talk-container">
                        {accountInfoStatus === "fetched" && listofSavedIDs.length >= 5 ? listofSavedIDs.map((savedID, index) => (
                        <SavedTalk TalkID={savedID} loggedInEmail={loggedInEmail} setMasterSavedList={setMasterSavedList}/>)) 
                        : accountInfoStatus === "fetched" && listofSavedIDs.length < 5 ? 
                            <div class="saved-talk-container">
                            <SavedTalk TalkID={listofSavedIDs[0]} loggedInEmail={loggedInEmail} setMasterSavedList={setMasterSavedList}/>
                            <SavedTalk TalkID={listofSavedIDs[1]} loggedInEmail={loggedInEmail} setMasterSavedList={setMasterSavedList}/>
                            <SavedTalk TalkID={listofSavedIDs[2]} loggedInEmail={loggedInEmail} setMasterSavedList={setMasterSavedList}/>
                            <SavedTalk TalkID={listofSavedIDs[3]} loggedInEmail={loggedInEmail} setMasterSavedList={setMasterSavedList}/>
                            <SavedTalk TalkID={listofSavedIDs[4]} loggedInEmail={loggedInEmail} setMasterSavedList={setMasterSavedList}/>
                            </div>
                        : <EmptyCollection type={1}/> }
                    </div>
            </div>
        </div>)
    } else {
        return (
            <div class="profile-container">
                <ProfileBar activePage={activePage} setActivePage={setActivePage} setLoggedInEmail={setLoggedInEmail}/>
                <div class="main-container">
                <div class="saved-talk-container">
                        {accountInfoStatus === "fetched"? 
                            <div class="saved-talk-container">
                            <ItineraryTalk Time={"9:00"} loggedInEmail={loggedInEmail} listofSavedIDs={listofSavedIDs} setMasterSavedList={setMasterSavedList} />
                            <ItineraryTalk Time={"10:30"} loggedInEmail={loggedInEmail} listofSavedIDs={listofSavedIDs} setMasterSavedList={setMasterSavedList}/>
                            <ItineraryTalk Time={"12:00"} loggedInEmail={loggedInEmail} listofSavedIDs={listofSavedIDs} setMasterSavedList={setMasterSavedList}/>
                            <ItineraryTalk Time={"14:00"} loggedInEmail={loggedInEmail} listofSavedIDs={listofSavedIDs} setMasterSavedList={setMasterSavedList}/>
                            <ItineraryTalk Time={"15:30"} loggedInEmail={loggedInEmail} listofSavedIDs={listofSavedIDs} setMasterSavedList={setMasterSavedList}/>
                            </div>
                        : <EmptyCollection type={0}/> }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;