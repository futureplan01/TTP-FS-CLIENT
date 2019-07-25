import { Link } from "react-router-dom";
import React from 'react';

function Header (props){
    return (
        <div id='HeaderContainer'>
            <ul id = 'Header' >
                <li ><Link id='HeaderLeft' className ='HeaderList' to ='/Transaction'>Transaction</Link></li>
                <li ><Link className ='HeaderList' to ='/Portfolio'>Portfolio</Link></li>
            </ul>
        </div>
    );
}

export default Header;
