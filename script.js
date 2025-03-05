import { key } from "./apiKey.js";

// Select HTML elements into DOM
const img = document.querySelector(".image");
const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".searchImage");
const refreshButton = document.querySelector(".refresh");

// Set a default search value
let defaultQuery = "landscape";

// Receive a new search value and insert it into the URL
async function getNewImage(valueQuery) {
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${valueQuery}`;
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`NOT OK ${response.status}`);
    }
    const newData = await response.json();
    img.src = newData.data.images.original.url;

    /* 
    fetch(url, { mode: "cors" }) // Use CORS to avoid errors
      .then((response) => {
        // If theres an error different than 20x (success) show it
        if (!response.ok) {
          throw new Error(`NOT OK ${response.status}`);
        }
        // Otherwise return the response in JSON format
        return response.json();
      })
      .then((response) => {
        //Log the URL and show it in the main page
        console.log(response.data.images.original.url);
        img.src = response.data.images.original.url;
      })
      .catch(function (error) {
        // Show any error (it usually covers network connections and not status messages)
        console.error(`Something went wrong: ${error}`);
      });

      */
  } catch (error) {
    console.error(`There is an error: ${error.message}`);
  }
}

/*
async function getPersonsInfo(name) {
  try {
    const people = await server.getPeople();
    const person = people.find(person => { return person.name === name });
    return person;
  } catch (error) {
    // Handle the error any way you'd like
  }
}

*/
// Show a new image without refreshing
refreshButton.addEventListener("click", () => {
  getNewImage(defaultQuery);
});

// Insert a new search value and call the function to show a new Image
searchButton.addEventListener("click", () => {
  if (searchInput.value === "") {
    alert("Empty values not allowed");
  } else {
    defaultQuery = searchInput.value;
    getNewImage(defaultQuery);
  }
});

//Initial function call
getNewImage(defaultQuery);
