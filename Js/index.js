
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////        ASYNC FUNCTION using try and catch following Mollify structure         /////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const getAPI = document.querySelector(".fetch-and-create-innehtml-no-export")
const errorContainer = document.querySelector(".error")

async function fetchData() {
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/gamehub/'); // Await the fetch request
    if (!response.ok) {                                                     // try remove a word from URL and 
                                                                            // see the error occur on page and console.log
      errorContainer.innerHTML +=  `<div class="error">   
                                      <p>Something went wrong</p>
                                    </div>`;

      // Check for HTTP error statuses
      throw new Error('Network response was not ok ' + response.statusText);

      
    }

    const data = await response.json(); // Parsing JSON
    console.log('Data received1:', data); // Handling the data

    for(let i = 0; i < data.length; i++){   
         getAPI.innerHTML +=  `<a class="item-card" href="/product/index.html?data[i]id=${data[i].id}">                
                                  <img src="${data[i].image}" alt="${data[i].title}"/>
                                  <h3 class="title">${data[i].title}</h3>
                                  <div class="flex-sale">
                                    <p class="${data[i].onSale ? "on-sale" : ""}">${data[i].onSale ? data[i].price : ""}</p>
                                    <p class="current-price">$ ${data[i].onSale ? data[i].discountedPrice : data[i].price} </p>
                                  </div>
       </a>`
      }



  } catch (error) {
    console.error('Fetch error:', error.message); // Handling any errors

    
  }
}

fetchData(); // Execute the async function



/////////////////////////////////////////////////////////////////////////////////////////////////////
//////       ASYNC FUNCTION using try and catch but using forEach instead of .innerHTML        //////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const getAPI2 = document.querySelector(".fetch-and-foreach-to-create-html") 
const errorContainer2 = document.querySelector(".error2")

async function fetchData2() {
  try {
    const response = await fetch('https://api.noroff.dev/api/v1/gamehub/'); // Await the fetch request
    if (!response.ok) {

      errorContainer2.innerHTML +=  `<div class="error">   
                                      <p>Something went wrong</p>
                                    </div>`;
      // Check for HTTP error statuses
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json(); // Parsing JSON
    
    console.log('Data received2:', data); // Handling the data

    data.forEach((data) =>{

      // First we create a div that will hold the content inside same as .innerHTML

      const gameCard = document.createElement("div"); // << we use the same words as we would from HTML, div, p, header, footer etc...
      gameCard.classList.add("parent-div");      
      getAPI2.appendChild(gameCard);
      // *see above* We use appendChild to inside () bracket to which element we want to add inside that other element.
      // This case we add 'image' inside the div 'gameCard' which is the previously created element.
      // getAPI2 is the const we have created before linked to a div in 'index-test.html'

      const image = document.createElement("img");
      image.classList.add("image-box");
      image.src = `${data.image}`;
      image.alt = `${data.title}`;
      gameCard.appendChild(image)

      // The tricky part is not confusing yourself with appendChild and adding elements in wrong place,
      // I will then suggest create it in HTML first and use that as guidance.

      const gameTitle = document.createElement("h3")
      gameTitle.classList.add("game-title");
      gameTitle.textContent = `${data.title}`;
      gameCard.appendChild(gameTitle)

      const gameInfo = document.createElement("div");
      gameInfo.classList.add("flex-sale");      
      gameCard.appendChild(gameInfo);

      const priceRegular = document.createElement("p")
      priceRegular.textContent = `${data.onSale ? data.price : ""}`; // << here I am comparing if onSale is true or false and it 
      gameInfo.appendChild(priceRegular)                             //    will display accordingly the result is statement is true or false
                                                                     //    same goes for the one below but this time reversed 
      const priceDiscount = document.createElement("p")              //    after '?' as I want to display the discounted price         
      priceDiscount.classList.add("current-price")
      priceDiscount.textContent = `${data.onSale ? data.discountedPrice : data.price}`
      gameInfo.appendChild(priceDiscount)


      // I try follow this structure and would be best to do so in order

            // <div>                                         < first element created
            //   <img src="image.src" alt="image.alt">       < second element created
            //   <h3>Title of element</h3>                   < third element created
            //   <div>                                       < fourth element created
            //     <p>price1</p>                             < fifth element created
            //     <p>price2</p>                             < sixth element created
            //   </div>
            // </div>



    } ); 

  } catch (error) {
    console.error('Fetch error:', error.message); // Handling any errors

    errorContainer.innerHTML +=  `<div class="error">
                                    <h1>${allresults.msg}</h1>
                                    <p>Error status: ${allresults.status}</p>
                                    <p>Something went wrong</p>
                                  </div>`;
  }
}

fetchData2();

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////    THIS uses export functions from another JS file, see below how it is imported     //////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Her importer jeg funksjonen og hvilke fil det er ( husk .js) hvis den ikke legges til automatisk
import { grabGame } from "./fetchApi.js"
import { createHTML } from "./createhtml.js"

const getAPI3 = document.querySelector(".fetch-and-create-innehtml-via-export")
const errorContainer3 = document.querySelector(".error3")


let games = []

const allGames = await grabGame()    
                                     
console.log("Error or not?", allGames) 

if(allGames.error === false){    

    games = allGames.games

    console.log("data fetched", games)

    for(let i = 0; i < games.length; i++){   
      getAPI3.innerHTML +=  createHTML(games[i]) 
     }

} else

  errorContainer3.innerHTML = ""

  errorContainer3.innerHTML = `<div class="error">                        
                                <h3>${allGames.msg}</h3>
                                <p>Error status: ${allGames.status}</p>                                
                                <p>Error: ${allGames.error}</p>
                              </div>
    `;
                // By following the example from 'fetchApi.js' about displaying the selfmade array, here 'allGames'
                // refer back to [data] followed up by [0] and its content and next [1] followed by its content..etc etc
                // just like the API console.log shows.
                // In this case allGames has an array of 'games, error, status and msg' which we can use as above.



/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Depending on usage of inneHTML or creatingElement, they both have their uses. While one is easier to follow and 
// the other demands much more thinking and planning. CreatingElement gives you access directly to the element you 
// create while innerHTML does not, with javascript in mind.


// This correlates with <button>'s we use in the cart or product pages needs to be accessible via JS which innerHTML lacks.
// So by using createElement also gives us access to JS too, as we can apply it directly when creating it.

/*  
  <div>
    <div class="flex-children-to-row">                  
      <div class="image-box"></div>                    
      <div class="flex-column">                         
        <div class="movie-info">
          <div class="loader"></div>
        </div>
        <button class="addcart">Add to cart</button>
      </div>
  </div> 
*/
// ^ This would be inside the HTML code  ^

  //    By adding button in HTML we get access to the button via JS querySelector
  //    We still need to add button.addEventListener('click', run-function)
  //    * run-function is the 'function()' it will run on click *

  //     EXAMPLE:
  //       const buttonPlus = document.createElement("button")
  //       buttonPlus.classList.add('plus')
  //       buttonPlus.textContent = "+"
  //       buttonPlus.dataset.action = 'increase'                         < JS
  //       quantityWrapper.appendChild(buttonPlus);
  //       buttonPlus.addEventListener("click", removeOneFromCart)        < JS