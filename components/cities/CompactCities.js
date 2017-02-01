import React from 'react';
import {observer} from 'mobx-react';
import Clock from '../../utils'

@observer
export default class CompactCities extends React.Component {

    convertTime(time){
        return (new Date(time));
    }

    render() {
        const city = this.props.city;
        const name = city.timezone;
        let cityName = name.split("/")
        const temp = Math.round((city.currently.temperature - 32)*(5/9)) + " º C";
        const img = city.img
        let clock = new Clock().updateClock(cityName[1], name);
        return (

            <div className="col-sm-4">
                <div className="city-element" onClick={()=>{this.props.callApi()}}>
                    <div className='data-info'>
                        <div className="city-name">
                            {name}
                        </div>
                        <div className="city-hour">
                            {temp}
                        </div>
                        <div className="city-time" id={cityName[1]}>
                        </div>
                    </div>
                    <img src={img}/>
                </div>
            </div>
        );
    }
}
