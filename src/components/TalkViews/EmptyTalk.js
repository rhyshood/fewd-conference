import React from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';

const EmptyTalk = ({type}) => {
    
    return (
        <div class="talk-container">
            {type !== 1?
            <div class="time-container">
                <h3> </h3>
            </div>:null}
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