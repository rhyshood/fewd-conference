import React from "react";
import './../styles/Main.css';
import SearchTalk from "./TalkViews/SearchTalk";

function SearchView({ searchParameters }) {

    return (
        <div class="main-container">
            <SearchTalk row={0} searchParameters = { searchParameters }/>
            <SearchTalk row={1} searchParameters = { searchParameters }/>
            <SearchTalk row={2} searchParameters = { searchParameters }/>
            <SearchTalk row={3} searchParameters = { searchParameters }/>
            <SearchTalk row={4} searchParameters = { searchParameters }/>
        </div>
    );
  };

export default SearchView;