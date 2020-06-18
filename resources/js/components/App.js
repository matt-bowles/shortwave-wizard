import React from 'react';
import ReactDOM from 'react-dom';

import { SearchBar, BroadcastList } from './index';
import { CircularProgress } from '@material-ui/core';
import { filterSearch, getChangePageData } from '../api/';

export default class App extends React.Component {

    constructor() {
        super();
    
        this.state = {
             broadcasts: [],
             pageData: {},
             language: '',
             freq: '',
             station: '',
             isLive: false,
             isLoading: false,
        }

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleStationChange = this.handleStationChange.bind(this);
        this.handleFreqChange = this.handleFreqChange.bind(this);
        this.handleIsLiveChange = this.handleIsLiveChange.bind(this);
        this.handleFilterSearch = this.handleFilterSearch.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    handleLanguageChange(language) {
        this.setState({ language });
    }

    handleStationChange(station) {
        this.setState({ station });
    }

    handleFreqChange(freq) {
        this.setState({ freq });
    }

    handleIsLiveChange(event) {
        this.setState({ isLive: event.target.checked });
    }

    async handleFilterSearch() {
        this.setState({ isLoading: true })
        let data = await filterSearch(this.state.freq, this.state.language, this.state.station, this.state.isLive);
        
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
                <SearchBar 
                    handleLanguageChange={this.handleLanguageChange}
                    handleStationChange={this.handleStationChange}
                    handleFreqChange={this.handleFreqChange}
                    handleIsLiveChange={this.handleIsLiveChange}
                    handleFilterSearch={this.handleFilterSearch}
                />
                {this.renderBroadcastList()}
            </div>
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
