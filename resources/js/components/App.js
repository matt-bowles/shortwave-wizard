import React from 'react';
import ReactDOM from 'react-dom';

import { SearchBar, BroadcastList, Title } from './index';
import { CircularProgress, Container, Paper } from '@material-ui/core';
import { filterSearch, getChangePageData } from '../api/';

export default class App extends React.Component {

    constructor() {
        super();
    
        this.state = {
             broadcasts: [],
             pageData: {},
             isLoading: false,
        }

        this.handleFilterSearch = this.handleFilterSearch.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    async handleFilterSearch(params) {
        this.setState({ isLoading: true })
        let data = await filterSearch(params);
        
        let broadcasts = data.data.data;
        delete data.data.data;
        let pageData = data.data;
        this.setState({ broadcasts, pageData, isLoading: false });
    }

    async changePage(url) {
        this.setState({ isLoading: true });
        let data = await getChangePageData(url);

        let broadcasts = data.data.data;
        delete data.data.data;
        let pageData = data.data;

        this.setState({ broadcasts, pageData, isLoading: false });
    }

    renderBroadcastList() {
        if (this.state.isLoading) {
            return (
                <CircularProgress />
            );
        }

        return (
            <BroadcastList
                broadcasts={this.state.broadcasts}
                pageData={this.state.pageData}
                changePage={this.changePage}
            />
        );
    }

    render() {
        return (
            <div className="container">
                <Container>
                <Title />
                <Paper>
                    <SearchBar 
                        handleFilterSearch={this.handleFilterSearch}
                    />
                    {this.renderBroadcastList()}
                </Paper>
                </Container>
            </div>
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
