import React from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';

function LoggedOutTalk() {

    return (
        <div class="talk-container">
            <div class="time-container">
                <h3>9:00 AM</h3>
            </div>
            <div class="talk-body-container">
                <h2>Martin Fowler: Patterns of Enterprise Application Architecture</h2>
                <p></p>
            </div>
        </div>
    );
}

export default LoggedOutTalk;