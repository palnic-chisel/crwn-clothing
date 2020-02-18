import React, {useEffect} from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import CollectionOverviewContainer from "../../components/CollectionsOverview/CollectionOverviewContainer";
import CollectionContainer from "../collection/CollectionContainer";
import {fetchCollectionsStart} from "../../redux/shop/ShopActions";


const ShopPage = ({match, fetchCollectionsStart}) => {

    //per triggerare fetchCollection solo una volta lo mettiamo tra le dipendenze perche sappiamo che è un prop che non cambierà mai.
    useEffect(() => {
        fetchCollectionsStart()
    }, [fetchCollectionsStart]);


    return (
        <div className='shop-page'>
            <Route
                exact
                path={`${match.path}`}
                component={CollectionOverviewContainer}
            />
            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionContainer}
            />
        </div>
    );

}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);