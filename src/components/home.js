import React, { useState } from "react";
import "./home.css";

function CreateSearchBar() {
  //need to figure out how to set state to empty for getting error
  const [keyword, setKeyword] = useState("iphone");
  const [products, setProducts] = useState([]);

  // sync and async
  // async doing something out of order but async await = sync
  async function searchButton() {
    // console.log("this is search word", keyword);

    const baseURL =
      "https://svcs.sandbox.ebay.com/services/search/FindingService/v1?";
    // select all selected characters: command + control + g
    // breakdown api address for future editing
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

    // use proxy url to overcome security hizards
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const completeURL = proxyURL + baseURL + queryParams;
    const response = await fetch(completeURL);
    // convert data to json format
    const data = await response.json();

    // console.log("wtf", data);
    // console.log("!", data.findItemsByKeywordsResponse);
    const further = data.findItemsByKeywordsResponse;

    const searchResults = further[0].searchResult[0].item; // is an array with all elements

    console.log("search", searchResults);
    // create array of products with details we want
    const array = [];
    searchResults.forEach((eachItem) => {
      let productDetails = {
        name: eachItem.title[0],
        location: eachItem.country[0],
        galleryURL: eachItem.galleryURL[0],
        sellingPrice: eachItem.sellingStatus[0].currentPrice[0].__value__,
        itemNum: eachItem.itemId[0],
        //figure our about subtitle/shipping info because they are different in differend product data
        subtitle: eachItem.subtitle
      };

      console.log("the price is", productDetails.sellingPrice)
      array.push(productDetails);
    });
    // set state of products to this array we created
    setProducts(array);
  }
  return (
    <div className="search-bar">
      <input
        type="placeholder"
        onChange={(event) => setKeyword(event.target.value)}
      ></input>
      <button onClick={() => searchButton()}>Search</button>
      <Product properties={products} />
    </div>
  );
}

// create a componenet to display product and properties 
function Product({ properties }) {
  const productElements = [];
  properties.forEach((item, index) => {
    const itemName = (
      <div className="main-container">
      <div className="container" key={index}>
      <img src={item.galleryURL} />
       <p className="product-name"> {item.name}</p> 
       <p > Price: {item.sellingPrice}$ </p> 
       <p>Location available: {item.location}</p> 
       <p>Product# {item.itemNum}</p> 
       <p>Offer: {item.subtitle}</p> 
       <button>add to cart</button>
    <p></p>
       </div>
       
       </div>
    );
    productElements.push(itemName);
  });

  return (
    <div className="main">
      {productElements}
    </div>
  );
}

export default CreateSearchBar;
