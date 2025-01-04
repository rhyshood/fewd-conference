import React from "react";
import './../styles/Main.css';
import LoggedOutTalk from "./TalkPreviews/LoggedOutTalk";

function ViewBySession() {
    return (
        <div class="main-container">
            <LoggedOutTalk />
            <LoggedOutTalk />
            <LoggedOutTalk />
            <LoggedOutTalk />
            <LoggedOutTalk />
        </div>
    );
}

export default ViewBySession;