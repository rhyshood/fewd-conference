import React, { useState } from "react";
import './../styles/Main.css';
import './../styles/Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div class="main-container">
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
                    <p>Forgot Your Password</p>
                    <div class="register-container">
                        <p>Don't have an account yet?</p>
                        <p>Click here to Register</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;