import React, { useState, useEffect } from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';
import PopUp from "../PopUp";
import { GetTalkById, GetAccountInfo, GetRemoveFromSaved, GetAddToSaved, GetRemoveFromItinerary } from "../DBController";
import EmptyTalk from "./EmptyTalk";

const ItineraryTalk = ({ Time, loggedInEmail,  listofSavedIDs, setMasterSavedList}) => {
    const [open, setOpen] = useState(false);
    const [listofItineraryIDs, setItineraryList] = useState({});
    const {accountInfoStatus, accountInfo} = GetAccountInfo(loggedInEmail);
    useEffect(() => {
        if (accountInfoStatus === "fetched" && accountInfo.length > 0) {
            setMasterSavedList(accountInfo[0].saved); 
            setItineraryList(accountInfo[0].itinerary);
        }
    }, [accountInfoStatus, accountInfo]);
    const {talkStatus, Talk} = GetTalkById(listofItineraryIDs[Time]);
    const RemoveFromSaved = GetRemoveFromSaved().RemoveFromSaved;
    const RemoveFromItinerary = GetRemoveFromItinerary().RemoveFromItinerary;
    const AddToSaved = GetAddToSaved().AddToSaved;

    if(listofItineraryIDs[Time] === ""){
        return(<EmptyTalk Time={Time}/>)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const HandleRemoveFromSaved = (TalkID) => {
        RemoveFromSaved(loggedInEmail,TalkID);
        setMasterSavedList((prevList) => prevList.filter((id) => id !== TalkID));
    };

    const HandleAddToSaved = (TalkID) => {
        AddToSaved(loggedInEmail,TalkID);
        setMasterSavedList((prevList) => [...prevList, TalkID]);
    };

    const removeFromItinerary = (TalkID, talkTime) => {
        RemoveFromItinerary(loggedInEmail,TalkID, talkTime);
        setItineraryList((prevList) => ({ ...prevList, [talkTime]: "" }));
    };

    function checkSaved(TalkID){
        for (let x = 0; x < listofSavedIDs.length; x++){
            if(TalkID === listofSavedIDs[x]){
                return true;
            }
        }
        return false;
    }

    function getAverageRating(ratings){
        let avg = 0;
        if (ratings.length === 0){
            return 0;
        }

        for (const id of Object.keys(ratings)) {
            avg = avg + ratings[id];
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
    console.log(Talk)
    if (accountInfoStatus === "fetched"){
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
                            {loggedInEmail !== "" && !checkSaved(TalkInfo.id) ? <button type="button" onClick={() => HandleAddToSaved(TalkInfo.id)}>Add to Saved</button> 
                            : loggedInEmail !== "" ? <button type="button" onClick={() => HandleRemoveFromSaved(TalkInfo.id)}>Remove from Saved</button> 
                            : null}

                            <button type="button" onClick={() => removeFromItinerary(TalkInfo.id, TalkInfo.time)}>Remove from Itinerary</button>
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
        return(<EmptyTalk Time={Time}/>)}
    };

export default ItineraryTalk;