import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import './CollectionOverviewStyle.scss'
import PreviewCollection from "../preview-collection/PreviewCollection";
import {selectCollectionsForPreview} from "../../redux/shop/shop-selectors";

const CollectionOverview = ({collections}) => (
    <div className='collections-overview'>
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <PreviewCollection key={id} {...otherCollectionProps}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector(
    {
        collections: selectCollectionsForPreview
    }
);

export default connect(mapStateToProps)(CollectionOverview)
