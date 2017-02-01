import { observable, autorun} from 'mobx';
import {observer} from 'mobx-react';

class CityStore {
	@observable cities = [];
	@observable loading;

	constructor(){}

	updateCities(cities) {
		this.cities.map((city)=>{
			let currentCity = cities.filter(function( obj ) {
			  return obj.timezone == city.timezone;
			});
			if(city.currently.temperature != currentCity[0].currently.temperature){
				city.currently.temperature = currentCity[0].currently.temperature
			}
		});
		this.loading = false;
	}

	getInitialCities(cities){
		this.cities = cities;
		this.loading = false;
	}

}

const cityStore = new CityStore()

export default CityStore;