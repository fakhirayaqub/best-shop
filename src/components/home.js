import React, { useState } from "react";
import "./home.css";

function CreateSearchBar() {
  const [keyword, setKeyword] = useState("iphone");
  const [products, setProducts] = useState([]);

  // sync and async
  // async doing something out of order

  // sync

  // 1. Chop onions
  // 2. Cook onions until they are a golden color // wait until the step is done!
  // 3. Chop pepper
  // 4. Add peppers to the pan

  // async
  // 1. Chop onions
  // 2. start cooking
  // 3. Chop pepper
  // 2. Cook onions until they are a golden color // wait until the step is done!
  // 4. Add peppers to the pan

  async function searchButton() {
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
      "&paginationInput.entriesPerPage=20" +
      "&GLOBAL-ID=EBAY-US" +
      "&siteid=0";

    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const completeURL = proxyURL + baseURL + queryParams;
    const response = await fetch(completeURL);

    const data = await response.json();

    console.log("wtf", data);
    // console.log("!", data.findItemsByKeywordsResponse);
    const further = data.findItemsByKeywordsResponse;

    const searchResults = further[0].searchResult[0].item; // is an array with 6 elements

    console.log("search", searchResults);
    const array = [];
    searchResults.forEach((eachItem) => {
      let productDetails = {
        name: eachItem.title[0],
        location: eachItem.location[0],
        photo: eachItem.galleryURL[0],
        itemNum: eachItem.itemId[0],
      };
      array.push(productDetails);
    });

    setProducts(array);
  }
  return (
    <div className="search-bar">
      <input
        type="placeholder"
        onChange={(event) => setKeyword(event.target.value)}
      ></input>
      <button onClick={() => searchButton()}>Search</button>
      <Product donkey={products} another={keyword} color="blue" />
    </div>
  );
}
// You searched for the keyword:

function Product({ donkey, another, color }) {
  const productElements = [];
  // const productsLocation = [];

  donkey.forEach((item, index) => {
    const itemName = <p key={index} > {item.name} {item.location} {item.itemNum} </p>;

    productElements.push(itemName);
    
  });

  return (
    <div>
      <p>A MEOW PRODUCT</p>
    
      {productElements}
     
    </div>
  );
}

export default CreateSearchBar;
