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

function GetTalksInfoBySess(sessionID){
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

export default GetTalksInfoBySess;