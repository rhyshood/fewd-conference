import React, { useState } from "react";
import SearchBar from "../bars/SearchBar";
import SearchView from "./SearchView";

function Search({loggedInEmail}) {

    const [searchParameters, setSearchParameters] = useState("talks/")
    return (
        <div class="whatson-container">
            <SearchBar searchParameters = { searchParameters } setSearchParameters = { setSearchParameters }/>
            <SearchView searchParameters = { searchParameters } loggedInEmail={loggedInEmail}/>
        </div>
    );
}

export default Search;