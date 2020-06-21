import React from 'react';
import ReactDOM from 'react-dom';

import { NavBar, SearchPage, AboutPage } from './index';
import { Container, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
    return (
        <div className="container">
            <Container>
                <Router>
                    <NavBar />
                    <Paper>
                        <Switch>
                            <Route path="/" component={SearchPage} exact={true} />
                            <Route path="/about" component={AboutPage} />
                        </Switch>
                    </Paper>
                </Router>
            </Container>
        </div>
    )
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
