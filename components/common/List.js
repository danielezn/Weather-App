import React from 'react';
import { observable, autorun} from 'mobx';
import {observer} from 'mobx-react';

@observer
class List extends React.Component {

    render() {
        const ItemType = this.props.itemType;
        const cities = this.props.cities || [];
        const markupItems = this.createItemsMarkup(cities, ItemType);

        return (
                <div className="container-fluid">
                    <div className="row-fluid" data-ui-role="content">
                        {markupItems}
                    </div>
                </div>
        );
    }

    createItemsMarkup(cities, Type) {
        const markupItems = cities.map((city, idx) => {
            return (
                <Type city={city} key={idx} callApi={()=>{this.props.callApi()}}/>
            );
        });

        return markupItems;
    }
}
export default List;