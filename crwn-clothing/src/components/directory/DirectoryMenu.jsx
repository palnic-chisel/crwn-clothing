import React from 'react';
import MenuItem from "../menu-item/MenuItem";

import {connect} from 'react-redux'

import './DirectoryMenuStyle.scss';
import {createStructuredSelector} from "reselect";
import {selectDirectorySections} from "../../redux/directory/directory-selectors";

const DirectoryMenu = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({id, ...otherSectionProps}) => (
                    <MenuItem key={id} {...otherSectionProps}/>
                )
            )
        }
    </div>
);

const mapStateToProps = createStructuredSelector(
    {
        sections: selectDirectorySections,
    }
);

export default connect(mapStateToProps)(DirectoryMenu);
