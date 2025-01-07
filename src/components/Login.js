import React, { useState } from "react";
import PopUp from "./PopUp";
import './../styles/Main.css';
import './../styles/Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div class="main-container">
            <div class={open ? ("popup-container open") : "popup-container"}>
                <PopUp isOpen={open} onClose={handleClose}>
                    <div class="register-form-container">
                        <h1 class="form-title register">Register</h1>
                        <div class="form-inputs">
                            <form>
                                <div class="name-fields-container">
                                    <div class="name-input-container">
                                        <label>First Name:</label>
                                        <input 
                                            class="input name"
                                            type="text" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div class="name-input-container">
                                        <label>Second Name:</label>
                                        <input 
                                            class="input name"
                                            type="text" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <label>Password:</label>
                                    <input 
                                        class="input text"
                                        type="password" 
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </div>
                                <div class="checkbox-container register">
                                    <label for="stayLoggedIn"> I have read and agreed to the privacy policy </label>
                                    <input type="checkbox" id="stayLoggedIn" name="stayLoggedIn" value="Yes"/>
                                </div>
                                <input class="submit-button" type="submit" value="Register"/>
                            </form>
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
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
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