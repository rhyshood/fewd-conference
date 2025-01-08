import React from "react";
import './../styles/Main.css';
import './../styles/Profile.css';

const AccountSettings = ({ loggedInEmail }) => {
    
    return (
        <div class="profile-action-container">
            <div class="profile-title-container">
                <h1 class="page-title">Account Settings</h1>
            </div>
            <div id="account-info-container" class="account-setting-category-container">
                <div class="header">Account Information</div>
                <div class="account-info-fields">
                    <div class="account-info first-name">
                        <p class="account-info-text">First Name:</p>
                        <p class="account-info-text">Rhys</p>
                    </div>
                    <div class="account-info padding" />
                    <div class="account-info last-name">
                        <p class="account-info-text">Last Name:</p>
                        <p class="account-info-text">Hood</p>
                    </div>
                    <div class="account-info padding" />
                    <div class="account-info email">
                        <p class="account-info-text">Email Address:</p>
                        <p class="account-info-text">r@r.com</p>
                    </div>
                </div>
                <div class="account-settings-button-container">
                    <button>Update Account Information</button>
                    <button>Update Password</button>
                </div>
            </div>
            <div class="account-setting-category-container">
                <div class="header">Security</div>
                <div class="account-info-fields">
                        <p class="account-info-text">Two Factor-Authentication:</p>
                        <p class="account-info-text">Disabled</p>
                </div>
                <div class="account-settings-button-container">
                    <button>Enable 2FA</button>
                    <button>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;