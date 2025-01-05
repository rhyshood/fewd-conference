import React from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';

const EmptyTalk = ({ row, sessionID }) => {
    
    return (
        <div class="talk-container">
            <div class="time-container">
                <h3> </h3>
            </div>
            <div class="talk-body-container">
                <div class="talk-information-container">
                    <h2 class="talk-title"> </h2>
                    <p class="talk-description-preview"> </p>
                </div>
            </div>
        </div>
    );
};

export default EmptyTalk;