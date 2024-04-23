import { createCartItem } from "./createCart.js"
import { getFromStorage } from "./localstorage.js"

let localStorageList = getFromStorage("movieitem")

const cartContainer = document.querySelector(".itemContainer")

if(localStorageList.length > 0){


  const HTML = createCartItem(localStorageList)
  
  cartContainer.appendChild(HTML)


}else{
  cartContainer.innerHTML = "Your cart is empty"
}





