import React, { useState } from "react";
import "./home.css";

function CreateSearchBar() {
  const [title, setTitle] = useState("");

  function searchButton() {
    console.log("this is title", title);
    const url =
      "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=FakhiraY-bestshop-PRD-3e65479d5-631ff4ed&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=gabor&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0";

    try {
      fetch(url, { mode: "no-cors" })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {console.log("error is", error)}
  }

  return (
    <div className="search-bar">
      <input
        type="placeholder"
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <button onClick={() => searchButton()}>Search</button>
    </div>
  );
}

export default CreateSearchBar;
