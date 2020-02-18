import React, {useEffect} from "react";
import {connect} from 'react-redux';

import './CollectionStyle.scss';
import {selectCollection} from "../../redux/shop/shop-selectors";
import CollectionItem from "../../components/CollectionItem/CollectionItem";

const Collection = ({collection}) => {
//Inserire una funzione nel return dell'useEffect (clean up func) equivale ad utilizzare il componentWillUnmount
    useEffect(()=>{
        console.log("mounted");
        return () => {
            console.log("unmounting");
        }
    }, []);

    console.log(collection);
    const {title, items} = collection;
    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => <CollectionItem key={item.id} item={item}/>)
            }
        </div>
    </div>)
};


//Il secondo parametro ownProps indica i props di questo componente. Lo utilizziamo per passargli il nome del path (hats, jackets..)
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(Collection);