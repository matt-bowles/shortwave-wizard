import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import styles from './NavBar.module.css';

export default class Title extends Component {
    render() {
        return (

            <AppBar position="static">
            <Toolbar style={{color: "white"}}>
                
                <Button component={Link} to={"/"} style={{marginRight: "60px"}}>Shortwave Wizard</Button>
 
                <Button component={Link} to={"/about"} color="inherit" style={{float: "right"}}>About</Button>
            </Toolbar>
            </AppBar>

            // <nav>
            //     <Link to="/"><h1>Shortwave Wizard 🧙</h1></Link>
            //     <Link to="/about"><li>About</li></Link>
            // </nav>
        )
    }
}
