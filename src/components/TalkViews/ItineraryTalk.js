import React, { useState, useEffect } from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';
import PopUp from "../PopUp";
import { GetItineraryID, GetTalkById } from "../DBController";
import EmptyTalk from "./EmptyTalk";

const ItineraryTalk = ({ talkTime, loggedInEmail  }) => {
    const {talkStatus, Talk} = GetItineraryID(loggedInEmail, talkTime);
    console.log(Talk)
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    function getAverageRating(ratings){
        let avg = 0;
        if (ratings.length === 0){
            return 0;
        }

        for (let x = 0; x < ratings.length; x++){
            avg = avg + ratings[x];
        }

        avg = avg / ratings.length;

        return avg.toFixed(2);
    }

    function getListOfTags(tags){
        let str = tags[0];
        if (tags.length > 1){
            for (let x = 1; x < tags.length; x++){
                str = str + ", " + tags[x];
            }
        }

        return str;
    }

    if (talkStatus==='fetched'){
        let TalkInfo = Talk[0];
        return (
                <div class="talk-container">
                    <div class="time-container">
                        <h3>{TalkInfo.time}</h3>
                    </div>
                    <div class="talk-body-container">
                        <div class="talk-information-container">
                            <h2 class="talk-title">{TalkInfo.speaker + ": " + TalkInfo.title}</h2>
                            <p class="talk-description-preview">{TalkInfo.description}</p>
                        </div>
                        <div class="talk-button-container">
                            <button type="button" onClick={handleOpen}>View Full Details</button>
                            <PopUp isOpen={open} onClose={handleClose}>
                            <>
                                <h1>{TalkInfo.title}</h1>
                                <h2>{TalkInfo.speaker}</h2>
                                <h2>Session {TalkInfo.session} - {TalkInfo.time}</h2>
                                <div class="detailed-rating-score">
                                    <img className="star-icon" src="/images/star.png" alt="star"></img>
                                    <h2 className="rating-score"> {getAverageRating(TalkInfo.ratings)}</h2>
                                </div>
                                <div class="detailed-description-container">
                                    <div class="header">About</div>
                                    <p class="detailed-description-text">{TalkInfo.description}</p>
                                </div>
                                <p class="detailed-tag-list">Tags: {getListOfTags(TalkInfo.tags)}</p>
                            </>
                            </PopUp>
                        </div>
                    </div>
                </div>
            );
        
    } else {
        return(<EmptyTalk/>)}
    };

export default ItineraryTalk;