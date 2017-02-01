import redis from 'redis';
import Promises from 'bluebird';
import requests from 'request';
import nconf from 'nconf';

class Cities {
	getAll(callback){
        const client = redis.createClient(6379, '127.0.0.1');
        client.hgetall('api.cities', (err, citiesCoords) => {
            var citiesArray = []
            for(var city of Object.keys(citiesCoords)){
                let cityObject = JSON.parse(citiesCoords[city])
                citiesArray.push({city: city, ltd: cityObject.ltd, lng: cityObject.lng })
            }
            this.processAll(this, citiesArray, callback)
        });
    }

    processAll(self, cities, callback) {
        let citiesFiltered = []
        return Promises.map(cities, function(city){
            return self.getCity(city.ltd, city.lng)
        })
        .then((updatedCities)=>{
            updatedCities.map((city)=>{
                const cityFixed = JSON.parse(city.body)
                cityFixed['img'] = "/assets/images/" + cityFixed.timezone + ".jpg"
                citiesFiltered.push(cityFixed)
            });
            callback(citiesFiltered)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    getCity(ltd, lng){
        let request = Promises.promisifyAll(requests);
        return request.getAsync(nconf.get("forecast") + ltd + "," + lng + "?exclude=minutely,hourly,dayly,alerts,flags")
    }
}

export default Cities;