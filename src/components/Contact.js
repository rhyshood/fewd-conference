import React, { useState } from "react";
import './../styles/Main.css';
import './../styles/Contact.css';

function Contact() {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div class="main-container">
            <div class="form-container">
                <h1 class="form-title">Contact Us</h1>
                <div class="form-inputs">
                    <form>
                        <label>Email Address:</label>
                        <input 
                            class="input text"
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Message:</label>
                        <textarea 
                            rows="12"
                            class="input text area"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <input class="submit-button" type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;