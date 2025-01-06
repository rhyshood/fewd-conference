import React, { useState } from "react";
import SearchBar from "../bars/SearchBar";
import SearchView from "./SearchView";

function Search() {

    const [searchParameters, setSearchParameters] = useState("talks/")
    console.log(searchParameters);
    return (
        <div class="whatson-container">
            <SearchBar searchParameters = { searchParameters } setSearchParameters = { setSearchParameters }/>
            <SearchView searchParameters = { searchParameters } />
        </div>
    );
}

export default Search;