import { useState, useEffect, useCallback } from 'react';

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