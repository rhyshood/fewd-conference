import React from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';
import GetTalksInfoBySess from "../TalkInformation";

const LoggedOutTalk = ({ row, sessionID }) => {

    const {status, TalksInfo} = GetTalksInfoBySess(sessionID);
    if (status==='fetched'){
    return (
        <div class="talk-container">
            <div class="time-container">
                <h3>{TalksInfo[row].time}</h3>
            </div>
            <div class="talk-body-container">
                <div class="talk-information-container">
                    <h2 class="talk-title">{TalksInfo[row].speaker + ": " + TalksInfo[row].title}</h2>
                    <p class="talk-description-preview">{TalksInfo[row].description}</p>
                    <button>View Full Details</button>
                </div>
            </div>
        </div>
    );
    } else {
    return<p>There is currently an issue displaying the food menu</p>}
};

export default LoggedOutTalk;