import React from "react";
import './../../styles/Main.css';
import './../../styles/Talk.css';
import EmptyTalk from "./EmptyTalk";

const EmptyCollection = (type) => {
    
    return (
        <div class="empty-collection">
            <EmptyTalk type={type}/>
            <EmptyTalk type={type}/>
            <EmptyTalk type={type}/>
            <EmptyTalk type={type}/>
            <EmptyTalk type={type}/>
        </div>
    );
};

export default EmptyCollection;