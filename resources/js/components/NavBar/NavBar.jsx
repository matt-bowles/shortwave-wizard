import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';

import styles from './NavBar.module.css';

export default class Title extends Component {
    render() {
        return (
            <nav>
                <Link to="/"><h1>Shortwave Wizard 🧙</h1></Link>
                <Link to="/about"><li>About</li></Link>
            </nav>
        )
    }
}
