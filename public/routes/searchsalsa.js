const request = require('request');
const apikey = require('./secretfile').apikey
exports.searchSalsa = function searchSalsa(req,res){
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=salsa+dance+in+coventry&radius=10000&location=52.4068,-15197&key=${apikey}`
    request.get(url, function(error, response, body){
        if(!error) //if there is no error
        {
            const salsaPlaces = [] 
            //create empty lists to contain salsa places

            const salsaPlacesResults = JSON.parse(body).results 
            //JSON.PARSE create javascript object from JSON data
            for(let i=0;i<salsaPlacesResults.length;i++){
                const place = {
                    Address:salsaPlacesResults[i].formatted_address,
                    Name:salsaPlacesResults[i].name,
                    Rating:salsaPlacesResults[i].rating
                }
                salsaPlaces.push(place)
            }
            res.send({'Salsa places in Coventry':salsaPlaces})
        }
        else{
            res.send({message:'Error with API', error:error})
        }
    })
}

