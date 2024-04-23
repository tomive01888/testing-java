export function createHTML(arr) {  

  let html = `<a class="item-card" href="../product/index.html?arrid=${arr.id}">
                <img src="${arr.image}" alt="${arr.title}"/>
                <h3 class="title">${arr.title}</h3>
                <div class="flex-sale">
                  <p class="${arr.onSale ? "on-sale" : ""}">${arr.onSale ? arr.price : ""}</p>
                  <p class="current-price">$ ${arr.onSale ? arr.discountedPrice : arr.price} </p>
                </div>
              </a>`

   return html
}

//  eksporterer funksjonen fra en js fil inn i en annen for 
//  å slippe å måtte repetere seg selv ved flere bruk.


//  Må sette ett ord inne i funksjonen hvis
//  man eksporterer, i denne bruker jeg 'arr' det man setter inn senere ved import bruk
//  gir en path som skal tilsvare det samme som console.log


 // Her bruker jeg en metode for å lage HTML som er helt lik vanlig HTML.
 // For enklest mulig oversikt foreslår jeg å bruke en HTML og  klippe og lime inn her i js etterpå.
 // Backwards tick >  ``  < brukes for å få aktivere .js funksjoner slik at man
 // kan ta i bruk:  ${}
 // inne i ${} bruker man pathing som tilsvarer det du finner i console.log av result.
 // V1 API går rett på sak, mens V2 API går innom en subfolder '.data' først før den går inn i full liste.
