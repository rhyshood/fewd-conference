import React from "react";
import './../styles/Main.css';
import './../styles/WhatsOn.css';

function SessionBar({activeSession, setActiveSession}) {
    function changePage(evt, sessionID) {
        clearActive();
        evt.currentTarget.className += " active";
        setActiveSession(sessionID)
    }

    function clearActive(){
        var i, navlinks;

        navlinks = document.getElementsByClassName("sessionlinks");
        for (i = 0; i < navlinks.length; i++) {
            navlinks[i].className = navlinks[i].className.replace(" active", "");
        }
    }

    function checkActiveSession(buttonID){
        
        if (buttonID === activeSession){
            return "sessionlinks active";
        } else {
            return "sessionlinks";
        }
    }

    return (
        <div class="Session-bar">
            <div class="Session-padding top"></div>
               <div class="Session-buttons">
                    <button class={checkActiveSession("A")} onClick={(evt) => changePage(evt, "A")}>Session A</button>
                    <button class={checkActiveSession("B")} onClick={(evt) => changePage(evt, "B")}>Session B</button>
                    <button class={checkActiveSession("C")} onClick={(evt) => changePage(evt, "C")}>Session C</button>
                </div>
            <div class="Session-padding bottom"/>
        </div>
    );
}

export default SessionBar;