import React from 'react'

import { SearchBar, BroadcastList } from '../index';
import { CircularProgress, Typography } from '@material-ui/core';
import { filterSearch, getChangePageData } from '../../api';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {

    document.title = "Shortwave Wizard 🧙 - Page not found";

    return (
        <div style={{ textAlign: "center", padding: "20% 0 20% 0" }}>
            <Typography variant="h4" center>⚠️ 404 – page not found ⚠️</Typography>
            <Typography variant="h5"><Link to="/">Take me back</Link></Typography>
        </div>
    )
}