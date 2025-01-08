import React from "react";
import './../styles/Main.css';
import WhatsOnTalk from "./TalkViews/WhatsOnTalk";

function ViewBySession({sessionID, loggedInEmail}) {

    return (
        <div class="main-container">
            <WhatsOnTalk row={0} sessionID={sessionID} loggedInEmail={loggedInEmail}/>
            <WhatsOnTalk row={1} sessionID={sessionID} loggedInEmail={loggedInEmail}/>
            <WhatsOnTalk row={2} sessionID={sessionID} loggedInEmail={loggedInEmail}/>
            <WhatsOnTalk row={3} sessionID={sessionID} loggedInEmail={loggedInEmail}/>
            <WhatsOnTalk row={4} sessionID={sessionID} loggedInEmail={loggedInEmail}/>
        </div>
    );
  };

export default ViewBySession;