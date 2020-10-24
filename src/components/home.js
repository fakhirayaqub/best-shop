import React, { useState } from "react";
import "./home.css";

function CreateSearchBar() {
  const [keyword, setKeyword] = useState("iphone");

  function searchButton() {
    // console.log("this is title", keyword);

    const baseURL =
      "https://svcs.sandbox.ebay.com/services/search/FindingService/v1?";
    // select all selected characters: command + control + g
    const queryParams =
      "SECURITY-APPNAME=FakhiraY-bestshop-PRD-3e65479d5-631ff4ed" +
      "&OPERATION-NAME=findItemsByKeywords" +
      "&SERVICE-VERSION=1.0.0" +
      "&RESPONSE-DATA-FORMAT=JSON" +
      "&REST-PAYLOAD" +
      `&keywords=${keyword}` +
      "&paginationInput.entriesPerPage=6" +
      "&GLOBAL-ID=EBAY-US" +
      "&siteid=0";
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const completeURL = proxyURL + baseURL + queryParams;

    try {
      fetch(completeURL)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          console.log("!", data.findItemsByKeywordsResponse);
          const response = data.findItemsByKeywordsResponse;
          // console.log("!!", response[0]);
          // console.log("!!!", response[0].searchResult);

          const searchResults = response[0].searchResult[0].item; // is an array with 6 elements

          showSearchRetuls(searchResults);

          function showSearchRetuls(results) {
            results.forEach((eachItem) => {
              let productDetails = {
                name: eachItem.title,
                location: eachItem.location,
                photo: eachItem.galleryURL,
                itemNum: eachItem.itemId,
              };

              console.log("each item is", productDetails);
            });
          }
        });
    } catch (error) {
      console.log("error is", error);
    }
  }

  return (
    <div className="search-bar">
      <input
        type="placeholder"
        onChange={(event) => setKeyword(event.target.value)}
      ></input>
      <button onClick={() => searchButton()}>Search</button>
    </div>
  );
}

export default CreateSearchBar;
