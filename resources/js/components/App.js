import React from 'react';
import ReactDOM from 'react-dom';

import { SearchBar, BroadcastList } from './index';

import { filterSearch } from '../api/';

export default class App extends React.Component {

    constructor() {
        super();
    
        this.state = {
             broadcasts: [],
             pageData: {},
             language: '',
             freq: '',
             station: '',
        }

        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleStationChange = this.handleStationChange.bind(this);
        this.handleFreqChange = this.handleFreqChange.bind(this);
        this.handleFilterSearch = this.handleFilterSearch.bind(this);
    }

    handleLanguageChange(language) {
        this.setState({ language });
    }

    handleStationChange(station) {
        this.setState({ station });
    }

    handleFreqChange(freq) {
        this.setState({ freq })
    }

    async handleFilterSearch() {
        let data = await filterSearch(this.state.freq, this.state.language, this.state.station);
        
        let broadcasts = data.data.data;
        delete data.data.data;
        let pageData = data.data;
        this.setState({ broadcasts, pageData });
    }
    

    render() {
        return (
            <div className="container">
                <SearchBar 
                    handleLanguageChange={this.handleLanguageChange}
                    handleStationChange={this.handleStationChange}
                    handleFreqChange={this.handleFreqChange}
                    handleFilterSearch={this.handleFilterSearch}
                />
                <BroadcastList
                    broadcasts={this.state.broadcasts}
                    pageData={this.state.pageData}
                />
            </div>
        )
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
