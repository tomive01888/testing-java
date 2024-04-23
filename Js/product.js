

const baseURL = 'https://api.noroff.dev/api/v1/gamehub/'

const itemContainer = document.querySelector(".single-product")
const errorBox = document.querySelector(".errorbox")
const addCartBtn = document.querySelector(".add-cart")


let gameInfo = {}
let localStorageList = getLocalKey("gameitem") // the string value is whatever you want it to be


//////////////////////////////////////////////////////////////////
// MODULE 5 API ADVANCED URL PARAMETERS
const parameterString = window.location.search;     

const searchParameters = new URLSearchParams(parameterString)

const arrId = searchParameters.get("arrid")
// this bit above part of Module 5 on Mollify : API Advanced URL parameters
// What we essentially are doing is grabbing a string of the url we went to, via index page as we click an item.

// Example this URL: http://127.0.0.2:5503/product/index.html?arrid=2bbaab8b-57b0-47f6-ab8d-8d443ac767da

// This bit is what we have created beforehand in the index (homepage) in the <a> href part.
//>> this bit: (see below) nmr1- index.js & nmr2- createhtml.js
//from first one        getAPI.innerHTML +=  `<a class="item-card" href="/product/index.html?arrid=${data[i].id}">  (line28)nmr1
//from createElement    gameCard.href = `/product/index.html?arrid=${data.id}`;                                     (line78)nmr1
//from the export       let html = `<a class="item-card" href="/product/index.html?arrid=${arr.id}">                (line9)-nmr2
//
// arrid is the key-word we'll search for, which we want to grab.
// whatever comes after '=' should be the id of a product
// 
// And we use that string value to add into our baseURL for us to access the single item part of the full array.
// See more on Mollify to understand it better.
//
// In short '?' is the keyword for a searchable part of URL, with 'window.location.search'
// URLSearchParams() is where we will be using the 'window.location.search', searching in the URL string
// and by using '.get' we are grabbing the keyword string value, which we made beforehand 'arr=id'

console.log("this is ID of game:", arrId) // we can use a string to easier identify each console.log


async function singleProductPage(){

    try{

        const req = await  fetch(baseURL + arrId);

        if(!req.ok){           // if respone from fetch is wrong, we give error immediately '!' means opposite so 'req.ok' is not ok :(


             //inside this if I have added a overwrite on the parent div which shows the user an error message
            errorBox.innerHTML =  `<div class="error">   
                                     <h1>Something went wrong</h1>
                                     <p>Error status: 404</p>
                                     <p>Something went wrong</p>
                                   </div>`;
            throw new Error('Network response was not ok');

        }
        // if all is ok, this part runs as normal

        const result = await req.json();

        let gameInfo = result

        console.log("Should be all...", result) // this will console.log all 10 items available.

        itemContainer.innerHTML = `
                                    <div class="item">
                                        <img src="${gameInfo.image}" alt="${gameInfo.title}">
                                        <div class="item-info">
                                            <div>
                                                <h2>${gameInfo.title}</h2>
                                                <p>${gameInfo.onSale ? "&#x2105;" : ""} </p>
                                            </div>            
                                            <p>Released: ${gameInfo.released}</p>
                                            <p>Genre:${gameInfo.genre}</p>
                                            <p>Description: ${gameInfo.description}</p>
                                            <p>$ ${gameInfo.onSale ? gameInfo.discountedPrice : gameInfo.price}</p>
                                        </div>
                                    </div>`;
    } catch(error){
        
        console.error('Fetch error:', error.message); // Handling any errors

    }
} 

singleProductPage()




addCartBtn.addEventListener("click", addItemToStorage)

function addItemToStorage(){

    let qty = 1; 

    // Here we make our own array, which we can set into the localStorage
    let gameToAdd = {
        title: gameInfo.title,
        url: gameInfo.image,
        quantity: qty,
        quantity: gameInfo.onSale ? gameInfo.discountedPrice : gameInfo.price,
    }

    const isGameStored = isItemincart(localStorageList, gameInfo.title) // See below function

  if(!isGameStored){   //Depending on return of function below, if it returns TRUE, 'ELSE' will run
                       // If item is not in localStorage the 'IF' will run and set the selfmade array into localStorage,
    localStorageList.push(gameToAdd)

    localStorage.setItem("gameitem", JSON.stringify(localStorageList))

  } 
  else {    

    alert("Item is already in cart") // Indicate the user that the merch is in the cart already ( This allows only 1 item!)

    //  !!  NOTE: Quantity increase is not needed in assignment. 

  }
}


// this function works like this:
// it's being used at line 107, inside the "()" we send key values at 'localStorageList' and 'movieDetail.data.title'
// which we have access to already.
// Info from localStorage is done by importing the function 'getLocalStorage.js' allowing us to see info
// from the local storage.
//
// These words will then be put into the function below replacing  the value already represented inside 
// the function.
// 'item' becomes 'localStorageList' and titleToCheck becomes the title of the game (depending on the games we clicked)
// replacing the words and makes the function work properly.

function isItemincart(item, titleToCheck){

    const found = item.some(obj => obj.title === titleToCheck);
  
    if(found) {
      return true
    }
  }


  function getLocalKey(key) {
    const savedInStorage = localStorage.getItem(key)
  
    if (!savedInStorage) {
      return []
    }
  
    return JSON.parse(savedInStorage)
    
  }