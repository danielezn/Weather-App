import React from 'react';
import {IndexLink} from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
        	<div className="jumbotron content-center">
			  <h1>Weather App</h1>
			  <p>Example application based on Redis, Node and Mobx</p>
			</div>
        );
    }
}
