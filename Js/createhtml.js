//  eksporterer funksjonen fra en js fil inn i en annen for 
//  å slippe å måtte repetere seg selv ved flere bruk.


//  Må sette ett ord inne i funksjonen hvis
//  man eksporterer, i denne bruker jeg arr forkortet fra array
export function createHTML(arr) {  

    let html = `<a class="item-card" href="/product/index.html?arrid=${arr.id}">                
                  <img src="${arr.image}" alt="${arr.title}"/>
                  <h3 class="title">${arr.title}</h3>
                  <div class="flex-sale">
                    <p class="${arr.onSale ? "on-sale" : ""}">${arr.onSale ? arr.price : ""}</p>
                    <p class="current-price">$ ${arr.onSale ? arr.discountedPrice : arr.price} </p>
                  </div>
                </a>`

     return html
 }

 // Her bruker jeg en metode for å lage HTML som er helt lik vanlig HTML.
 // For enklest mulig oversikt forslår jeg å bruke en HTML og  klippe og lime inn her i js etterpå.
 // Backwards tick >  ``  < brukes for å få aktivere .js funksjoner slik at man
 // kan ta i bruk:  ${}
 // inne i ${} bruker man pathing som tilsvarer den banen din 
 // API gir, dette kan ses i console.log av result.


 // For å se console.log av fetch, åpne index.html deretter console gjennom inspect av side,
 // og sjekk hvordan array er satt opp.
