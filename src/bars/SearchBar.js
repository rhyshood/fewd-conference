import React, {useState } from "react";
import './../styles/Main.css';
import './../styles/Search.css';

function SessionBar() {
    const [isSpeakerVisible, setIsSpeakerVisible] = useState(false);
    const [isSessionVisible, setIsSessionVisible] = useState(false);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [isTagsVisible, setIsTagsVisible] = useState(false);
    const [isRatingVisible, setIsRatingVisible] = useState(false);

    const changeSpeakerVisibility = (e) => {
        if (isSpeakerVisible === false) {
            setIsSpeakerVisible(true);
        } else {
            setIsSpeakerVisible(false);
        }
      };

    const changeSessionVisibility = (e) => {
        if (isSessionVisible === false) {
            setIsSessionVisible(true);
        } else {
            setIsSessionVisible(false);
        }
    };

    const changeTimeVisibility = (e) => {
        if (isTimeVisible === false) {
            setIsTimeVisible(true);
        } else {
            setIsTimeVisible(false);
        }
    };

    const changeTagsVisibility = (e) => {
        if (isTagsVisible === false) {
            setIsTagsVisible(true);
        } else {
            setIsTagsVisible(false);
        }
    };

    const changeRatingVisibility = (e) => {
        if (isRatingVisible === false) {
            setIsRatingVisible(true);
        } else {
            setIsRatingVisible(false);
        }
    };

    return (
        <div class="Search-bar">
            <div class="Search-padding top"></div>
               <div class="Search-buttons">
                    <button onClick={(e) => changeSpeakerVisibility(e)}>Speaker</button>
                    {isSpeakerVisible ? (
                        <select>
                            <option value="ap">AP</option>
                            <option value="ts">TS</option>
                        </select>
                        ) : null}
                    <button onClick={(e) => changeSessionVisibility(e)}>Session</button>
                    {isSessionVisible ? (
                        <select>
                            <option value="A">Session A</option>
                            <option value="B">Session B</option>
                            <option value="C">Session C</option>
                        </select>
                        ) : null}
                    <button onClick={(e) => changeTimeVisibility(e)}>Time</button>
                    <button onClick={(e) => changeTagsVisibility(e)}>Tags</button>
                    <button onClick={(e) => changeRatingVisibility(e)}>Rating</button>
                </div>
            <div class="Search-padding bottom"/>
        </div>
    );
}

export default SessionBar;