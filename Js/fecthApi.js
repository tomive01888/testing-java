let baseURL = "https://api.noroff.dev/api/v1/gamehub/"

// let baseURL = "https://v2.api.noroff.dev/gamehub/"

export async function grabGame(){   
   
        const req = await fetch(baseURL)

        //hvis baseURL er ok fra fetch, vil den gå inn her og kjøre gjennom første IF
        if(req.ok){

            const result = await req.json()
            const data = {
                games : result,
                error : false,
            }    
            return data 

        } 
        //hvis baseURL ikke er ok fra fetch vil den gå inn her og gi en error=true
        else{

            const data = {
                games : [],
                error : true,
                msg : "Error fetching API",
                status : 404,
            }

            return data 

        }
}