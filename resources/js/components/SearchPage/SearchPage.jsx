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
             usingUTC: true
        }

        this.handleFilterSearch = this.handleFilterSearch.bind(this);
        this.toggleTimeFormat = this.toggleTimeFormat.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    async handleFilterSearch(params) {
        this.setState({ isLoading: true, usingUTC: true })
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

    /**
     * Converts the schedule of a broadcast between UTC and their local timezone,
     * and vice versa.
     */
    toggleTimeFormat() {
        // Num. mins user's timezone is +/- UTC
        let offset = -(new Date().getTimezoneOffset())/0.6;

        if (this.state.broadcasts.length > 0) {
            let br = this.state.broadcasts;
            let flip = this.state.usingUTC ? 1 : -1;

            br.map((broadcast) => {
                    broadcast.start = (broadcast.start+(flip)*offset)%2400;
                    broadcast.end = (broadcast.end+(flip)*offset)%2400;

                    if (broadcast.start < 0) broadcast.start += 2400;
                    if (broadcast.end < 0) broadcast.end += 2400;
            });

            this.setState({ broadcasts: br, usingUTC: !this.state.usingUTC });
        }
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
                    toggleTimeFormat={this.toggleTimeFormat}
                />
                {this.renderBroadcastList()}
            </div>
        )
    }
}
