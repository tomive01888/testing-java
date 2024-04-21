
const baseURL = 'https://api.noroff.dev/api/v1/gamehub/'

const itemContainer = document.querySelector(".single-product")
const errorBox = document.querySelector(".errorbox")
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
//arrid=${id} meaning whatever comes after '=' should be the id of a product
// 
// And we use that string value to add into our baseURL for us to access the single item part of the full array.
// See more on Mollify to understand it better.
//
// In short '?' is the keyword for a searchable part of URL, with 'window.location.search'
// URLSearchParams() is where we will be using the 'window.location.search', searching in the URL string
// and by using '.get' we are grabbing the keyword string value, which we made beforehand 'arr=id'

console.log(arrId)


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

        const featuredItem = result   // This bit is more or less uneeded, but renaming the 'const result' into something 
                                      // more relatable can solve some confusion.

        console.log("99", featuredItem) // this will console.log all 10 items available.

        itemContainer.innerHTML = `
                                    <div class="item">
                                        <img src="${featuredItem.image}" alt="${featuredItem.title}">
                                        <div class="item-info">
                                            <div>
                                                <h2>${featuredItem.title}</h2>
                                                <p>${featuredItem.onSale ? "&#x2105;" : ""} </p>
                                            </div>            
                                            <p>Released: ${featuredItem.released}</p>
                                            <p>Genre:${featuredItem.genre}</p>
                                            <p>Description: ${featuredItem.description}</p>
                                            <p>$ ${featuredItem.onSale ? featuredItem.discountedPrice : featuredItem.price}</p>
                                        </div>
                                    </div>`;
    } catch(error){
        
        console.error('Fetch error:', error.message); // Handling any errors

    }
} 

singleProductPage()