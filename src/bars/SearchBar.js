import React, {useState, useEffect, useMemo } from "react";
import './../styles/Main.css';
import './../styles/Search.css';
import { GetAllSpeakers, GetAllTags } from "../components/DBController";

function SessionBar({searchParameters, setSearchParameters}) {
    const [isSpeakerVisible, setIsSpeakerVisible] = useState(false);
    const { speakerStatus, speakers } = GetAllSpeakers();
    const { tagStatus, tags } = GetAllTags();
    const [isSessionVisible, setIsSessionVisible] = useState(false);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const [isTagsVisible, setIsTagsVisible] = useState(false);
    const [isRatingVisible, setIsRatingVisible] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(5);
    const [selectedSpeaker, setSpeaker] = useState(" ");
    const [selectedSession, setSession] = useState(" ");
    const [selectedStartTime, setStartTime] = useState(" ");
    const [selectedEndTime, setEndTime] = useState(" ");

    function prepareTimeStatement(){
        let stmt = " ";

        
        if(selectedStartTime !== " "){
            stmt = selectedStartTime;
            if (selectedEndTime !== " "){
                stmt += "," + selectedEndTime;
                return stmt;
            }
            return stmt + ",16%3A00";
        } else if (selectedEndTime !== " "){
            return "9%3A00," + selectedEndTime;
        } else {
            return "9%3A00,16%3A00";;
        }
    }

    function checkNullRating(rating,isMax){
        if(isMax){
            if (rating === ""){
                return 5;
            }
        } else {
            if (rating === ""){
                return 0;
            }
        }
        return rating;
    }

    function updateSearchParameters(){
        let timeStmt = prepareTimeStatement();
        let newSearchParameters = "talks" 
        + "/speaker/" + selectedSpeaker
        + "/session/" + selectedSession
        + "/times/" + timeStmt 
        + "/tags/ "
        + "/rating/" + checkNullRating(minRating, false) + "," + checkNullRating(maxRating, true);

        setSearchParameters(newSearchParameters);
    }

    useEffect(() => {
        updateSearchParameters();
    }, [selectedSpeaker, selectedSession, minRating, maxRating, selectedStartTime, selectedEndTime]);

    function HandleSpeakerChange(e){
        setSpeaker(e.target.value);
        updateSearchParameters();
    }

    function HandleSessionChange(e){
        setSession(e.target.value);
        updateSearchParameters();
    }

    function handleStartTimeChange(e){
        setStartTime(e.target.value);
        updateSearchParameters();
    }

    function handleEndTimeChange(e){
        setEndTime(e.target.value);
        updateSearchParameters();
    }

    const GetSpeakerDropdown = useMemo(() => {
        if(speakerStatus === "fetched" && speakers.length > 0){
            return(speakers.map((speaker, index) => (
                <option value={speaker}>{speaker}</option>
            )))
        } else { return(<option>Loading...</option>) }
    }, [speakerStatus, speakers]);

    const handleCheckboxChange = (tag) => {
        setCheckedItems((prev) => ({
          ...prev,
          [tag]: !prev[tag], // Toggle the state for the specific item
        }));
    };

    function GetTagList(){
        if(tagStatus === "fetched" && tags.length > 0){
            return(tags.map((tag, index) => (
                <div class={"tag-entry " + index}>
                    <label class={"tag-label"}>{tag}</label>
                    <input
                        class={"tag-checkbox " + index}
                        type="checkbox"
                        checked={!!checkedItems[tag]} // Ensure it is a boolean
                        onChange={() => handleCheckboxChange(tag)}
                    />
                </div>
            )))
        } else { return(<p>Loading</p>) }
    }

    function handleMinRatingChange(e){
        let newMin = e.target.value;
        if (newMin === "") {
            setMinRating("");
        } else {
            let parsedMin = parseFloat(newMin);

            if (!isNaN(parsedMin) && parsedMin >= 0 && parsedMin <= maxRating) {
                setMinRating(newMin);
                updateSearchParameters();
            } else {
                setMinRating(minRating);
            }
        }
    }

    function handleMaxRatingChange(e){
        let newMax = e.target.value;
        if (newMax === "") {
            setMaxRating("");
        } else {
            let parsedMax = parseFloat(newMax);

            if (!isNaN(parsedMax) && parsedMax >= 0 && parsedMax >= minRating) {
                setMaxRating(newMax);
                updateSearchParameters();
            } else {
                setMaxRating(maxRating);
            }
        }
    }

    function GetTimeDropdown(){
        let times = []
        let timesEncoded = []

        for (let hour=9;hour<16;hour++){
            for(let minute=0o0;minute<60;minute=minute+30){
                times.push(hour + ":" 
                + minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}));
                timesEncoded.push(hour + "%3A" 
                    + minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}));
            }
        }

        return(times.map((time, index) => (
            <option value={timesEncoded[index]}>{time}</option>
        )))
    }

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
                        <select id="search-speaker-select" value={selectedSpeaker} onChange={HandleSpeakerChange}> 
                            <option value=" ">All</option>
                            {GetSpeakerDropdown}
                        </select>
                        ) : null}
                    <button onClick={(e) => changeSessionVisibility(e)}>Session</button>
                    {isSessionVisible ? (
                        <select id="search-session-select" value={selectedSession} onChange={HandleSessionChange}>
                            <option value=" ">All</option>
                            <option value="A">Session A</option>
                            <option value="B">Session B</option>
                            <option value="C">Session C</option>
                        </select>
                        ) : null}
                    <button onClick={(e) => changeTimeVisibility(e)}>Time</button>
                    {isTimeVisible ? (
                        <div class="time-search-container">
                            <div class="time-dropdown-container">
                                <label class="time-label from">From:</label>
                                <select id="search-starttime-select" value={selectedStartTime} onChange={handleStartTimeChange}>
                                    <option value=" "></option>
                                    {GetTimeDropdown()}
                                </select>
                                <label class="time-label to">To:</label>
                                <select class="search-endtime-select" value={selectedEndTime} onChange={handleEndTimeChange}>
                                    <option value=" "></option>
                                    {GetTimeDropdown()}
                                </select>
                            </div>
                        </div>
                        ) : null}
                    <button onClick={(e) => changeTagsVisibility(e)}>Tags</button>
                    {isTagsVisible ? (
                        <div class="tag-list">
                            {GetTagList()}
                        </div>
                        ) : null}
                    <button onClick={(e) => changeRatingVisibility(e)}>Rating</button>
                    {isRatingVisible ? (
                        <div class="rating-container">
                            <label class={"tag-label"}>Min Rating</label>
                            <input
                                id="search-minrating"
                                class="rating-textbox min"
                                type="text"
                                value={minRating}
                                onChange={(e) => handleMinRatingChange(e)}
                            />
                            <label class={"tag-label"}>Max Rating</label>
                            <input
                                id="search-maxrating"
                                class="rating-textbox max"
                                type="text"
                                value={maxRating}
                                onChange={(e) => handleMaxRatingChange(e)}
                            />
                        </div>
                        ) : null}
                </div>
            <div class="Search-padding bottom"/>
        </div>
    );
}

export default SessionBar;