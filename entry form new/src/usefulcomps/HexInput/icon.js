import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

class Icon extends Component {
    render() {
        return (
             <IconButton  >
                 <SearchIcon/>
             </IconButton>
            // <span>
            //    <i class="fa fa-search" aria-hidden="true"></i>
            // </span>
        )
    }
}

export default Icon;