import React from "react";
import './../styles/Main.css';
import './../styles/Profile.css';

function ProfileBar({activePage, setActivePage, setloggedInEmail}) {
    function changePage(evt, pageID) {
        clearActive();
        evt.currentTarget.className += " active";
        setActivePage(pageID)
    }

    function clearActive(){
        var i, profilelinks;

        profilelinks = document.getElementsByClassName("profilelinks");
        for (i = 0; i < profilelinks.length; i++) {
            profilelinks[i].className = profilelinks[i].className.replace(" active", "");
        }
    }

    function checkActivePage(buttonID){
        
        if (buttonID === activePage){
            return "profilelinks active";
        } else {
            return "profilelinks";
        }
    }

    return (
        <div class="Profile-bar">
            <div class="Profile-padding top"></div>
               <div class="Profile-buttons">
                    <button class={checkActivePage(1)} onClick={(evt) => changePage(evt, 1)}>Account Settings</button>
                    <button class={checkActivePage(2)} onClick={(evt) => changePage(evt, 2)}>Saved Talks</button>
                    <button class={checkActivePage(3)} onClick={(evt) => changePage(evt, 3)}>My Itinerary</button>
                </div>
            <div class="Profile-padding bottom"/>
        </div>
    );
}

export default ProfileBar;