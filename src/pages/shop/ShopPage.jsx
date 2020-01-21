import React, {Component} from 'react';
import SHOP_DATA from "./ShopData";
import PreviewCollection from "../../components/preview-collection/PreviewCollection";

class ShopPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }


    render() {
        const collections = this.state.collections;

        return (
            <div className='shop-page'>
                {
                    collections.map(({id, ...otherCollectionProps}) => (
                        <PreviewCollection key={id} {...otherCollectionProps}/>
                    ))
                }

            </div>
        );
    }
}

export default ShopPage;