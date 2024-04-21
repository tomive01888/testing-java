export function createHTML(game) {  

  let html = `<a class="item-card" href="/product/index.html?gameid=${game.id}">
                <img src="${game.image}" alt="${game.title}"/>
                <h3 class="title">${game.title}</h3>
                <div class="flex-sale">
                  <p class="${game.onSale ? "on-sale" : ""}">${game.onSale ? game.price : ""}</p>
                  <p class="current-price">$ ${game.onSale ? game.discountedPrice : game.price} </p>
                </div>
              </a>`

   return html
}

//  eksporterer funksjonen fra en js fil inn i en annen for 
//  å slippe å måtte repetere seg selv ved flere bruk.


//  Må sette ett ord inne i funksjonen hvis
//  man eksporterer, i denne bruker jeg 'game' det man setter inn senere ved import bruk
//  gir en path som skal tilsvare det samme som console.log


 // Her bruker jeg en metode for å lage HTML som er helt lik vanlig HTML.
 // For enklest mulig oversikt foreslår jeg å bruke en HTML og  klippe og lime inn her i js etterpå.
 // Backwards tick >  ``  < brukes for å få aktivere .js funksjoner slik at man
 // kan ta i bruk:  ${}
 // inne i ${} bruker man pathing som tilsvarer det du finner i console.log av result.
 // V1 går rett på sak, mens V2 går innom en subfolder '.data' først før den går inn i full liste.
