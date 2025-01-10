import React from "react";
import './../styles/Main.css';
import SearchTalk from "./TalkViews/SearchTalk";

function SearchView({ searchParameters, loggedInEmail }) {

    return (
        <div class="main-container">
            <SearchTalk row={0} searchParameters = { searchParameters } loggedInEmail={loggedInEmail}/>
            <SearchTalk row={1} searchParameters = { searchParameters } loggedInEmail={loggedInEmail}/>
            <SearchTalk row={2} searchParameters = { searchParameters } loggedInEmail={loggedInEmail}/>
            <SearchTalk row={3} searchParameters = { searchParameters } loggedInEmail={loggedInEmail}/>
            <SearchTalk row={4} searchParameters = { searchParameters } loggedInEmail={loggedInEmail}/>
        </div>
    );
  };

export default SearchView;