import React from 'react';
import { observable, autorun} from 'mobx';
import {observer} from 'mobx-react';
import List from '../common/List';
import CompactCities from './CompactCities';
import NoMatch from '../common/NoMatch'
import weatherError from '../../config/errors';
import 'whatwg-fetch'

@observer
class LatestCities extends React.Component {

    callApi(callback){
        this.props.store.loading = true;
        fetch('/api/updated-cities').then((response) => {
            return response.json();
        }).then((data) => {
            if (data.error != undefined){ throw new weatherError(data.error.message);}
            callback(data)
        }).catch((e) => {
            if(e instanceof weatherError){
                this.callApi((result)=>{this.props.store.getInitialCities(result)})
            }
        });
    }
    render() {
        let loadingToRender = <div className="windows8">
                                    <div className="wBall" id="wBall_1">
                                        <div className="wInnerBall"></div>
                                    </div>
                                    <div className="wBall" id="wBall_2">
                                        <div className="wInnerBall"></div>
                                    </div>
                                    <div className="wBall" id="wBall_3">
                                        <div className="wInnerBall"></div>
                                    </div>
                                    <div className="wBall" id="wBall_4">
                                        <div className="wInnerBall"></div>
                                    </div>
                                    <div className="wBall" id="wBall_5">
                                        <div className="wInnerBall"></div>
                                    </div>
                                </div>
        let listToRender = <List cities={this.props.store.cities} itemType={CompactCities} callApi={()=>{this.callApi((result)=>{this.props.store.updateCities(result)})}}/>
        let componentToRender = (this.props.store.loading == true ? loadingToRender : listToRender)
        return (
            <div>
                {componentToRender}
            </div>
        );
    }

    componentWillMount() {
        this.callApi((result)=>{this.props.store.getInitialCities(result)})
    }
}

export default LatestCities;