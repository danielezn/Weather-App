import React from 'react';
import citiesStore from '../../cities/city-store'
import LatestCities from '../cities/LatestCities';

export default class Dashboard extends React.Component {
    render() {
    	var cities = new citiesStore()
        return (
            <main>
                <LatestCities store={cities}/>
            </main>
        );
    }
}