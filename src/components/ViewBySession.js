import React from "react";
import './../styles/Main.css';
import LoggedOutTalk from "./TalkViews/LoggedOutTalk";

function ViewBySession({sessionID}) {

    return (
        <div class="main-container">
            <LoggedOutTalk row={0} sessionID={sessionID}/>
            <LoggedOutTalk row={1} sessionID={sessionID}/>
            <LoggedOutTalk row={2} sessionID={sessionID}/>
            <LoggedOutTalk row={3} sessionID={sessionID}/>
            <LoggedOutTalk row={4} sessionID={sessionID}/>
        </div>
    );
  };

export default ViewBySession;