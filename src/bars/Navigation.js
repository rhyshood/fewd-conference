import React from "react";
import './../styles/Navigation.css';
import { Link, useLocation} from 'react-router-dom';


function Navigation({loggedInEmail}) {

    function clearActive(){
        var i, navlinks;

        navlinks = document.getElementsByClassName("navlinks");
        for (i = 0; i < navlinks.length; i++) {
            navlinks[i].className = navlinks[i].className.replace(" active", "");
        }
    }
    
    function CheckLocation(targetLocation){
        let currentlocation = useLocation().pathname.split("/")[1];
        if (currentlocation === targetLocation){
            return "navlinks active";
        } else {
            return "navlinks";
        }
    }

    function changePage(evt) {
        clearActive();
        evt.currentTarget.className += " active";
    }

    function checkIfLoggedIn(){
        if (loggedInEmail !== "") {
            return (
                <Link to="profile"><button class={CheckLocation("profile")} onClick={(evt) => changePage(evt)}>My Profile</button></Link>
            );
        } else {
            return (
                <Link to="login"><button class={CheckLocation("login")} onClick={(evt) => changePage(evt)}>Log In</button></Link>
            );
        }
    }


    return (
        <div class="Navigation-bar">
            <div class="Navigation-padding left"></div>
            <div class="Navigation-buttons">
                <Link to="/"><button class={CheckLocation("whatson")} onClick={(evt) => changePage(evt)}>What's On</button></Link>
                <Link to="/search"><button class={CheckLocation("search")} onClick={(evt) => changePage(evt)}>Search</button></Link>
                {loggedInEmail !== "" ? <Link to="profile"><button class={CheckLocation("profile")} onClick={(evt) => changePage(evt)}>My Profile</button></Link>
                : <Link to="login"><button class={CheckLocation("login")} onClick={(evt) => changePage(evt)}>Log In</button></Link>}
                <Link to="/contact"><button class={CheckLocation("contact")} onClick={(evt) => changePage(evt)}>Contact Us</button></Link>
            </div>
            <div class="Navigation-padding right"/>
        </div>
    );
}

export default Navigation;