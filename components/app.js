import React from 'react';

import Header from './main/Header';
import Dashboard from './dashboard/Dashboard';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Dashboard />
            </div>
        );
    }
}
