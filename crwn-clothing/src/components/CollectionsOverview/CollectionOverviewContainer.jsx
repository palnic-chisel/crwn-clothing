import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching} from "../../redux/shop/shop-selectors";
import WithSpinner from "../withSpinner/withSpinner";
import CollectionOverview from "./CollectionOverview";
import {compose} from "redux";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer =  compose(
    connect(mapStateToProps),
    WithSpinner,
)(CollectionOverview);

export default CollectionsOverviewContainer;