import React from 'react';

import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from "./ErrorBoundaryStyles";

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state={
            hasErrored: false
        }
    }

    //catches any error that gets thrown in any of the children of this component
    static getDerivedStateFromError(error) {
        //process the error
        return {hasErrored:true}
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
                    <ErrorImageText>A dog ate this page</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary;