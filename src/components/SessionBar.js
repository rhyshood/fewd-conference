import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import './../styles/Main.css';
import './../styles/WhatsOn.css';

function SessionBar() {

    function changePage(evt) {
        clearActive();
        evt.currentTarget.className += " active";
    }

    function clearActive(){
        var i, navlinks;

        navlinks = document.getElementsByClassName("sessionlinks");
        for (i = 0; i < navlinks.length; i++) {
            navlinks[i].className = navlinks[i].className.replace(" active", "");
        }
    }

    clearActive()
    return (
        <div class="Session-bar">
            <div class="Session-padding top"></div>
               <div class="Session-buttons">
                    <Link to="whatson/session_a"><button class={"sessionlinks"} onClick={(evt) => changePage(evt)}>Session A</button></Link>
                    <Link to="whatson/session_b"><button class={"sessionlinks"} onClick={(evt) => changePage(evt)}>Session B</button></Link>
                    <Link to="whatson/session_c"><button class={"sessionlinks"} onClick={(evt) => changePage(evt)}>Session C</button></Link>
                </div>
            <div class="Session-padding bottom"/>
        </div>
    );
}

export default SessionBar;