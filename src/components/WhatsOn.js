import React, { useState } from "react";
import SessionBar from "../bars/SessionBar";
import ViewBySession from "./ViewBySession";

function WhatsOn({loggedInEmail}) {

    const [activeSession, setActiveSession] = useState("A");

    return (
        <div class="whatson-container">
            <SessionBar activeSession={activeSession} setActiveSession={setActiveSession}/>
            <ViewBySession sessionID={activeSession} loggedInEmail={loggedInEmail}/>
        </div>
    );
}

export default WhatsOn;