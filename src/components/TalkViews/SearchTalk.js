import React, { useState, useEffect } from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';
import PopUp from "../PopUp";
import { GetSearchResults, GetAccountInfo, GetRemoveFromSaved, GetAddToSaved, GetAddToItinerary, GetRemoveFromItinerary } from "../DBController";
import EmptyTalk from "./EmptyTalk";

const SearchTalk = ({ row, searchParameters, loggedInEmail  }) => {
    
    const {searchStatus, searchedTalksInfo} = GetSearchResults(searchParameters);
    const [open, setOpen] = useState(false);
    const [listofSavedIDs, setSavedList] = useState([]);
    const [listofItineraryIDs, setItineraryList] = useState({});
    const {accountInfoStatus, accountInfo} = GetAccountInfo(loggedInEmail);
    useEffect(() => {
        if (accountInfoStatus === "fetched" && accountInfo.length > 0) {
            setSavedList(accountInfo[0].saved); 
            setItineraryList(accountInfo[0].itinerary);
        }
    }, [accountInfoStatus, accountInfo, setSavedList]);
    const RemoveFromSaved = GetRemoveFromSaved().RemoveFromSaved;
    const AddToSaved = GetAddToSaved().AddToSaved;
    const AddToItinerary = GetAddToItinerary().AddToItinerary;
    const RemoveFromItinerary = GetRemoveFromItinerary().RemoveFromItinerary;

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const HandleRemoveFromSaved = (TalkID) => {
        RemoveFromSaved(loggedInEmail,TalkID);
        setSavedList((prevList) => prevList.filter((id) => id !== TalkID));
    };

    const HandleAddToSaved = (TalkID) => {
        AddToSaved(loggedInEmail,TalkID);
        setSavedList((prevList) => [...prevList, TalkID])

    };

    const HandleAddToItinerary = (TalkID, talkTime) => {
        console.log(loggedInEmail)
        AddToItinerary(loggedInEmail,TalkID, talkTime);
        setItineraryList((prevList) => ({ ...prevList, [talkTime]: TalkID }));
    };

    const HandleRemoveFromItinerary = (TalkID, talkTime) => {
        RemoveFromItinerary(loggedInEmail,TalkID, talkTime);
        setItineraryList((prevList) => ({ ...prevList, [talkTime]: "" }));
    };

    function checkItinerary(TalkID){
        for (const time of Object.keys(listofItineraryIDs)) {
            console.log(time)
            if (listofItineraryIDs[`${time}`] === TalkID && time !== "undefined"){
                return true;
            }
        }
        
        return false;
    }

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

    if (searchStatus==='fetched'){
        let TalkInfo = searchedTalksInfo[row];
        if (row+1 > searchedTalksInfo.length){
            return (
                <EmptyTalk />
            )
        } else {
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

                            {loggedInEmail !== "" && !checkItinerary(TalkInfo.id) && listofItineraryIDs[TalkInfo.time] === ""? <button type="button" onClick={() => HandleAddToItinerary(TalkInfo.id, TalkInfo.time)}>Add to Itinerary</button> 
                            : loggedInEmail !== "" && listofItineraryIDs[TalkInfo.time] === TalkInfo.id ? <button type="button" onClick={() => HandleRemoveFromItinerary(TalkInfo.id, TalkInfo.time)}>Remove from Itinerary</button> 
                            : null}
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
        }
    } else {
        return<p>There is currently an issue displaying the talk information</p>}
    };

export default SearchTalk;