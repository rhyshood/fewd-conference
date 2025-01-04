import React from "react";
import './../styles/Navigation.css';
import { Link } from 'react-router-dom';


function Navigation() {
    function clearActive(){
        var i, navlinks;

        navlinks = document.getElementsByClassName("navlinks");
        for (i = 0; i < navlinks.length; i++) {
            navlinks[i].className = navlinks[i].className.replace(" active", "");
        }
    }

    function changePage(evt) {
        clearActive();
        evt.currentTarget.className += " active";
    }

    clearActive()
    return (
        <div class="Navigation-bar">
            <div class="Navigation-padding left"></div>
            <div class="Navigation-buttons">
                <Link to="/"><button class="navlinks" onClick={(evt) => changePage(evt)}>What's On</button></Link>
                <Link to="/"><button class="navlinks" onClick={(evt) => changePage(evt)}>Search</button></Link>
                <Link to="/"><button class="navlinks" onClick={(evt) => changePage(evt)}>Button 3</button></Link>
                <Link to="/contact"><button class="navlinks" onClick={(evt) => changePage(evt)}>Contact Us</button></Link>
            </div>
            <div class="Navigation-padding right"/>
        </div>
    );
}

export default Navigation;