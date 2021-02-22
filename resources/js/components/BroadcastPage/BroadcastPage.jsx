import React, { Component } from "react";

import { getOne } from "../../api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default class BroadcastPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: "",
            station: "",
            freq: 0,
            isLive: false
        };
    }

    async componentDidMount() {
        // Trying to get the ID via react-router throws an invalid hook error - this is easier for the time being
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf("/") + 1);

        const data = await getOne(id);

        const broadcast = data.data;

        console.log(broadcast);

        // Invalid ID
        if (!broadcast) {
            alert("Uh oh spaghettio");
        }

        this.setState({
            freq: broadcast.freq,
            language: broadcast.language,
            station: broadcast.station,
            days: broadcast.days,
            start: broadcast.start,
            end: broadcast.end,
            lat: 0,
            lng: 0,
        });
    }

    condRendering() {
         if (this.state.freq == 0) {
             return;
         } else {
             
         }
    }

    render() {
        return (
            <div>
                {(this.state.freq !== 0 ?
                <div>
                    <p>Station: {this.state.station}</p>
                    <p>Frequency: {this.state.freq} kHz</p>
                    <p>Language: {this.state.language}</p>
                    <p>Days: {this.state.days}</p>
                    <p>Time: {this.state.start} - {this.state.end}</p>
                    
                    {/* <MapContainer
                        center={[this.state.lat, this.state.lng]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            tileSize="128"
                        />
                        <Marker position={[this.state.lat, this.state.lng]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer> */}
                </div>
                
                :
                // Loading ... 
                <h1>Loading...</h1>)}
            </div>
        );
    }
}
