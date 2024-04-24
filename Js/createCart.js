import { getFromStorage } from "./localstorage.js"

let localStorageList = getFromStorage("gameitem")

const cartOnDisplay = document.querySelector(".itemContainer")

const itemWrap = document.createElement("div")
itemWrap.classList.add("itemWrap")

export function createCartItem(arr){   

    cartOnDisplay.innerHTML = ""

    if(arr.length === 0){

      return []
    }

    if(arr.length > 0){
    
      for(let i = 0; i < arr.length; i++){ 
        
        const itemWrap = document.createElement("div")
        itemWrap.classList.add('single-product');
    
        //
        const containerFirst = document.createElement("div")
        containerFirst.classList.add('leftContainer');
        itemWrap.appendChild(containerFirst)
    
        const movieImage = document.createElement("img")
        movieImage.src = arr[i].image
        movieImage.alt = arr[i].title
        containerFirst.appendChild(movieImage)
    
        const movieTitle = document.createElement("p")
        movieTitle.textContent = arr[i].title
        movieTitle.classList.add("title")
        containerFirst.appendChild(movieTitle)
        
        //
        const containerSecond = document.createElement("div")
        containerSecond.classList.add('rightContainer')
        itemWrap.appendChild(containerSecond)    
        
        //
        const quantityWrapper = document.createElement("div")
        quantityWrapper.classList.add('qtyContainer')
        containerSecond.appendChild(quantityWrapper)  
    
        // const movieQnty = document.createElement("p")
        // movieQnty.textContent = arr[i].quantity      
        // containerSecond.appendChild(movieQnty)
      
        //
        const moviePrice = document.createElement("p")
        moviePrice.textContent = "$" +arr[i].price
        moviePrice.classList.add('price')    
        containerSecond.appendChild(moviePrice)
    
        const movieRemoveAll = document.createElement("button")
        movieRemoveAll.classList.add('remove-from-cart')
        movieRemoveAll.textContent = "X"
        movieRemoveAll.dataset.title = arr[i].title    
        containerSecond.appendChild(movieRemoveAll);
        movieRemoveAll.addEventListener('click', deleteFromCart)
    
        cartOnDisplay.appendChild(itemWrap)
    
        
      };

      return cartOnDisplay
    
    }else{

        return []
    }
}


function deleteFromCart(event){

    cartOnDisplay.innerHTML = ""
  
    const title = event.target.dataset.title
  
    if(localStorageList.length === 1){

      cartOnDisplay.innerHTML = ""
  
      localStorage.clear("gameitem");
      
      cartContainer.innerHTML = "Your cart is empty";  
  
      return
    }
  
    const removeOne = localStorageList.filter(obj => obj.title !== title)
  
    localStorageList = removeOne
  
    localStorage.setItem("gameitem", JSON.stringify(localStorageList))
  
    let HTML = createCartItem(localStorageList)
  
    cartContainer.appendChild(HTML)
  
  }