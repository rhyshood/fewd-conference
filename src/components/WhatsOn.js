import React from "react";
import SessionBar from "./SessionBar";
import ViewBySession from "./ViewBySession";

function WhatsOn() {

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
        <div class="whatson-container">
            <SessionBar />
            <ViewBySession />
        </div>
    );
}

export default WhatsOn;