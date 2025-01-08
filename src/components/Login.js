import React, { useState } from "react";
import PopUp from "./PopUp";
import './../styles/Main.css';
import './../styles/Login.css';
import { GetCreateAccount } from "./DBController";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [message, setMessage] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [acceptedPP, setAcceptedPP] = useState(false);
    const [open, setOpen] = useState(false);

    const { createAccount } = GetCreateAccount();

    function resetComponents(){
        setEmail("");
        setPassword("");
        setCPassword("");
        setMessage("");
        setfName("");
        setlName("");
    }
    
    const handleClose = () => {
        setOpen(false);
        resetComponents();
    };

    const handleOpen = () => {
        setOpen(true);
        resetComponents();
    };

    const handleAcceptCheckbox = () => {
        if (!acceptedPP){
            setAcceptedPP(true);
        } else {
            setAcceptedPP(false);
        }
    };

    function isValidEmail(emailAddress) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(emailAddress);
    }

    function containsSpecialCharacter(str) {
        const specialCharRegex = /[^a-zA-Z0-9\s]/;
        return specialCharRegex.test(str);
    }

    async function registerAccount(){
        setMessage("");
        if(fName !== "" && lName !== "" && email !== "" && password !== "" && cPassword !== ""){
            if(isValidEmail(email)){
                if (password === cPassword){
                    if (password.length >= 8){
                        if (containsSpecialCharacter(password)){
                            if(acceptedPP){
                                createAccount(fName, lName, email, password)
                                setMessage("Account Created Succesfully");
                            } else {
                                setMessage("Error: You Must Accept The Privacy Policy");
                            }
                        } else {
                            setMessage("Error: Password Must Contain a Special Character");
                        }
                    } else {
                        setMessage("Error: Password Must Be At Least 8 Characters");
                    }
                } else {
                    setMessage("Error: Passwords Do Not Match");
                }
            } else {
                setMessage("Error: Enter a Valid Email Address");
            }
        } else {
            setMessage("Error: Please Complete All Fields");
        }
    }

    return (
        <div class="main-container">
            <div class={open ? ("popup-container open") : "popup-container"}>
                <PopUp isOpen={open} onClose={handleClose}>
                    <div class="register-form-container">
                        <h1 class="form-title register">Register</h1>
                        <p class="form-error-text">{message}</p>
                        <div class="form-inputs">
                                <div class="name-fields-container">
                                    <div class="name-input-container">
                                        <label>First Name:</label>
                                        <input 
                                            class="input name"
                                            type="text" 
                                            value={fName}
                                            onChange={(e) => setfName(e.target.value)}
                                        />
                                    </div>
                                    <div class="name-input-container">
                                        <label>Surname:</label>
                                        <input 
                                            class="input name"
                                            type="text" 
                                            value={lName}
                                            onChange={(e) => setlName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <label>Email Address:</label>
                                <input 
                                    class="input text"
                                    type="text" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div class="register-password-container">
                                    <label>Password:</label>
                                    <input 
                                        class="input text"
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label>Confirm Password:</label>
                                    <input 
                                        class="input text"
                                        type="password" 
                                        value={cPassword}
                                        onChange={(e) => setCPassword(e.target.value)}
                                    />
                                </div>
                                <div class="checkbox-container register">
                                    <label for="stayLoggedIn"> I have read and agreed to the privacy policy </label>
                                    <input type="checkbox" id="stayLoggedIn" name="stayLoggedIn" onChange={handleAcceptCheckbox}/>
                                </div>
                                <button class="submit-button" onClick={registerAccount}>Register</button>
                        </div>
                    </div>
                </PopUp>
                <div class="form-container">
                    <h1 class="form-title">Log In</h1>
                    <div class="form-inputs">
                        <form>
                            <label>Email Address:</label>
                            <input 
                                class="input text"
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Password:</label>
                            <input 
                                class="input text"
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div class="checkbox-container">
                                <label for="stayLoggedIn"> Stay Logged In</label>
                                <input type="checkbox" id="stayLoggedIn" name="stayLoggedIn" value="Yes"/>
                            </div>
                            <input class="submit-button" type="submit" value="Log In"/>
                        </form>
                        <p class="popup-open-text">Forgot Your Password</p>
                        <div class="register-container">
                            <p>Don't have an account yet?</p>
                            <p class="popup-open-text" onClick={handleOpen}>Click here to Register</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;