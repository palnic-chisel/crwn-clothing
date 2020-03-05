import React from 'react'

import DirectoryMenu from "../../components/directory/DirectoryMenu";

import {HomePageContainer} from "./HomePageStyle";

const HomePage = () => {

    return (
        <HomePageContainer>
            <DirectoryMenu/>
        </HomePageContainer>
    )
};

export default HomePage;