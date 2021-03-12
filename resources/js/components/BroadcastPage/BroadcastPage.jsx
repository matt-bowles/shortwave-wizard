import React, { Component } from "react";

import { getOne } from "../../api";
import { getDayString, convertToLocalTime, formatTime } from '../../api/';

import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle } from "react-leaflet";
import { LatLng } from "leaflet";
import { destination } from 'leaflet-geometryutil';

import { Paper } from '@material-ui/core';

import styles from "./BroadcastPage.module.css";

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

        // Get data for requested single broadcast
        const data = await getOne(id);
        const broadcast = data.data;

        // Invalid ID
        if (!broadcast) {
            return alert("You have provided an invalid broadcast ID.");
        }

        this.setState({
            freq: broadcast.freq,
            language: broadcast.language,
            station: broadcast.station,
            days: broadcast.days,
            start: broadcast.start,
            end: broadcast.end,
            location: broadcast.location,
            broadcastCoords: broadcast.coords.split(", "),
            azimuth: broadcast.azimuth,
            power: broadcast.power,
        });

        // Attempt to obvtain the location of the user, and display it on the map later 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                this.setState({
                    userCoords: [pos.coords.latitude, pos.coords.longitude]
                });
            });
        }
    }
    
    /**
     * Predicts the coordinates based off a broadcast's given azimuth and power values.
     * @param {*} azimuth 
     */
    calculateCoverageCoords(azimuth) {
        var calcCoords = destination(new LatLng(this.state.broadcastCoords[0], this.state.broadcastCoords[1]), Math.abs(azimuth), this.power2Km());

        return [calcCoords.lat, calcCoords.lng];
    }

    /**
     * Estimates the coverage distance based off the station's broadcasting power
     * NOTE: this is purely an estimate, but seems to more-or-less provide an accurate representation
     */
    power2Km() {
        return 2500*(this.state.power*5);
    }

    render() {
        return (
            <Paper>
                {/* Leaflet CSS */}
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                    crossOrigin=""
                />

                {/* Leaflet Draw CSS */}
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.3/leaflet.draw.css"
                />

                {/* Wait until broadcast info has been loaded */}
                {this.state.freq !== 0 ? (
                    <div>
                        <h2>{this.state.station}</h2>
                        <p>Frequency: {this.state.freq} kHz</p>
                        <p>Language: {this.state.language}</p>
                        <p>Days: {getDayString(this.state.days)}</p>
                        <p>Time: {formatTime(this.state.start)} - {formatTime(this.state.end)}</p>
                        <p>Azimuth: {this.state.azimuth}</p>
                        <p>Power: {this.state.power}</p>

                        <MapContainer
                            center={this.state.broadcastCoords}
                            zoom={1.5}
                            width={100}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={this.state.broadcastCoords}>
                                <Popup>{this.state.location}</Popup>
                            </Marker>

                            
                            {this.state.azimuth === 'ND'
                                // Broadcast is non-directional (ND), and thus can be represented by a circle 
                                ? 
                                <Circle radius={this.power2Km()} center={this.state.broadcastCoords}/> 
                                : 
                                // Broadcast is directional
                                <Polygon positions={[
                                    this.state.broadcastCoords, 

                                    // The following coords sets allow for a triangle to be developed that projects the broadcast's direction (i.e. azimuth) and distance
                                    this.calculateCoverageCoords(this.state.azimuth-45),
                                    this.calculateCoverageCoords(this.state.azimuth),
                                ]}>
                                    <Popup>Approximated broadcast coverage area</Popup>
                                </Polygon>}
                            
                            {/* Display location of the user, if available */}
                            {this.state.userCoords ? (
                                <Marker position={this.state.userCoords}>
                                    <Popup>Your current location</Popup>
                                </Marker>
                            ) : <></>}
                        </MapContainer>

                        <p><b>Note:</b> this is only an approximation of the general coverage area and will likely vary depending on atmospheric conditions</p>
                        
                    </div>
                ) : (
                    // Loading ...
                    <h1>Loading...</h1>
                )}
            </Paper>
        );
    }
}
