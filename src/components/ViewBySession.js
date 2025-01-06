import React from "react";
import './../styles/Main.css';
import WhatsOnTalk from "./TalkViews/WhatsOnTalk";

function ViewBySession({sessionID}) {

    return (
        <div class="main-container">
            <WhatsOnTalk row={0} sessionID={sessionID}/>
            <WhatsOnTalk row={1} sessionID={sessionID}/>
            <WhatsOnTalk row={2} sessionID={sessionID}/>
            <WhatsOnTalk row={3} sessionID={sessionID}/>
            <WhatsOnTalk row={4} sessionID={sessionID}/>
        </div>
    );
  };

export default ViewBySession;