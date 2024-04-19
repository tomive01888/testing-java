let baseURL = "https://api.noroff.dev/api/v1//" //intentional error to display it

// let baseURL = "https://v2.api.noroff.dev/gamehub/"

export async function grabGame(){   
   
        const req = await fetch(baseURL)

        //hvis baseURL er ok fra fetch, vil den gå inn her og kjøre gjennom første IF
        if(req.ok){

            const result = await req.json()
            const data = {        // this adds to the previous 'const result' an extra layer and allows us to error handle the output
                games : result,   // 
                error : false,
            }    
            return data 

        } 
        //hvis baseURL ikke er ok fra fetch vil den gå inn her og gi en error=true
        else{

            const data = {                      // you can use this selfmade array to display on the webpage like you would
                games : [],                     // with the API array '${x.error}'
                error : true,   
                msg : "Error fetching API",
                status : 404,
            }

            return data 

        }
}