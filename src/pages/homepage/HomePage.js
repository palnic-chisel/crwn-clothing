import React from 'react'

import './HomePageStyle.scss'
import DirectoryMenu from "../../components/directory/DirectoryMenu";

const HomePage = () => (
    <div className = 'homepage'>
        <DirectoryMenu/>
    </div>
);

export default HomePage;