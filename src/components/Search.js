import React, { useState } from "react";
import SearchBar from "../bars/SearchBar";
import SearchView from "./SearchView";

function Search() {

    const [activeSession, setActiveSession] = useState("A");
    
    return (
        <div class="whatson-container">
            <SearchBar/>
            <SearchView />
        </div>
    );
}

export default Search;