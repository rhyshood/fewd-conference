import { useState, useEffect, useCallback } from 'react';
import bcrypt from 'bcryptjs';

function formatTime(time){
    let formatted = time.replace(":", "");
    return parseInt(formatted);
}

function sortChronologically(arr){
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (formatTime(arr[j].time) > formatTime(arr[j + 1].time)) {
                // Swap arr[j] and arr[j + 1]
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

export default function GetTalksInfoBySess(sessionID){
    const [status, setStatus] = useState('idle');
    const [TalksInfo, setTalksInfo]=useState([{
        id: "",
        speaker: "", 
        title: "", 
        description: "",
        time: "",
        tags: [],
        ratings: []
      }]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/talks/session/" + sessionID;
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        setTalksInfo(sortChronologically(incomingData));
        setStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, [sessionID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, TalksInfo};

}

export function GetSearchResults(searchParameters){
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchedTalksInfo, setSearchedTalksInfo]=useState([{
      id: "",
      speaker: "", 
      title: "", 
      description: "",
      time: "",
      tags: [],
      ratings: []
    }]);

const fetchData = useCallback(() => {
  const url = "http://localhost:3001" + searchParameters;
  fetch(url)
    .then((response) => response.json())
    .then((incomingData) => {
      setSearchedTalksInfo(sortChronologically(incomingData));
      setSearchStatus('fetched');
    })
    .catch((err) => console.error(err));
}, [searchParameters]);

useEffect(() => {
  fetchData();
}, [fetchData]);

return { searchStatus, searchedTalksInfo};

}

export function GetAllSpeakers(){
  const [speakerStatus, setSpeakerStatus] = useState('idle');
  const [speakers, setSpeakers]=useState([]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/talks/speakers";

    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        setSpeakers(incomingData);
        setSpeakerStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { speakerStatus, speakers};
}

export function GetAllTags(){
  const [tagStatus, setTagStatus] = useState('idle');
  const [tags, setTags]=useState([]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/talks/tags";

    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        setTags(incomingData);
        setTagStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { tagStatus, tags};
}

export function GetCreateAccount(){
  const createAccount = useCallback(async (fName, lName, email, password) => {
    let createStatus = "idle";
    let res = {};
    const url = "http://localhost:3001/account/create";
    const requestBody = {
      fName: fName,
      lName: lName,
      email: email,
      password: bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => response.json())
    .then((incomingData) => {
      res = incomingData;
      createStatus ='fetched';
    })
    .catch((err) => {
      console.error(err);
      createStatus ='error';
    });

    return {createStatus, res}
    
  }, []);

  return {createAccount};
}

export function GetTalkById(TalkID){
  const [talkStatus, setTalkStatus] = useState('idle');
  const [Talk, setTalk]=useState([{
    id: "",
    speaker: "", 
    title: "", 
    description: "",
    time: "",
    tags: [],
    ratings: []
  }]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/talks/id/" + TalkID;
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
          if (incomingData.length===1){
          setTalk(incomingData);
          setTalkStatus('fetched');
        }
      })
      .catch((err) => console.error(err));
  }, [TalkID]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { talkStatus, Talk};
}

export function GetSavedIDs(email){
  const [savedTalkStatus, setSavedTalkStatus] = useState('idle');
  const [savedTalks, setSavedTalks]=useState([{
    firstName: "",
    firstName: "",
    emailAddress: "",
    password: "",
    saved: [],
    itinerary: [],
    _id: ""
  }]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/account/savedID/email/" + email;

    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        setSavedTalks(incomingData);
        setSavedTalkStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, [email]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { savedTalkStatus, savedTalks};
}