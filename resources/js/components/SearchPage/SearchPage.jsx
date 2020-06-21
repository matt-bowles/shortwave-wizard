import React, { Component } from 'react'

import { SearchBar, BroadcastList } from '../index';
import { CircularProgress } from '@material-ui/core';
import { filterSearch, getChangePageData } from '../../api';

export default class SearchPage extends Component {
    
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
            <div>
                <SearchBar 
                    handleFilterSearch={this.handleFilterSearch}
                />
                {this.renderBroadcastList()}
            </div>
        )
    }
}
