import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from '@material-ui/core';
import Flag from 'react-world-flags';

import { fetchOptions, getChangePageData } from '../../api';

import styles from './BroadcastList.module.css';

export default function BroadcastList({broadcasts, pageData}) {
    
    if (broadcasts.length < 1) { return (<div>Please search</div>)}

    const [page, setPage] = useState(0);
    const [fetchedPageData, setPageData] = useState([]);
    const [fetchedBroadcasts, setFetchedBroadcasts] = useState([]);

    useEffect(() => {
        setFetchedBroadcasts(broadcasts);
        setPageData(pageData);
        setPage(0);
    }, broadcasts);


    const handleChangePage = async (event, newPage) => {
        let url = (page < newPage) ? fetchedPageData.next_page_url : fetchedPageData.prev_page_url;
        let data = await getChangePageData(url);

        setFetchedBroadcasts(data.data.data);
        delete data.data.data;
        setPageData(data.data);
        setPage(newPage++);
    }
    
    const isLive = (start, end, days) => {
        var d = new Date();
        var n = `${d.getUTCHours()}${d.getUTCMinutes()}`;
    
        var today = new Date().getDay()+1;
        if (today === 8) today = 1;

        return (start <= n && end >= n && days.includes(today)) ? "live" : "notLive";
    }

    const getDayString = (days) => {
        days = days.toString();
        let formatted = "";

        let today = new Date().getDay()+1;
        if (today === 8) today = 1;

        if (days.includes(2)) formatted += "M";
        if (days.includes(3)) formatted += "Tu";
        if (days.includes(4)) formatted += "W";
        if (days.includes(5)) formatted += "Th";
        if (days.includes(6)) formatted += "F";
        if (days.includes(7)) formatted += "Sa";
        if (days.includes(1)) formatted += "Su";

        return formatted;
    }

    const formatTime = (time) => {
        var formatted = time.toString().padStart(4, '0'); 
        formatted = formatted.substring(0,2) + ":" + formatted.substring(2);    // hh:mm
        return formatted;
    }

    const convertToLocalTime = (start, end) => {
        return "[placeholder]";
    }
    
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Frequency (kHz)</TableCell>
                            <TableCell>Station</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Time (UTC)</TableCell>
                            <TableCell>Broadcast Origin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchedBroadcasts.map((broadcast, i) => 
                            <TableRow key={i} hover className={isLive(broadcast.start, broadcast.end)}>
                                <TableCell>{broadcast.freq}</TableCell>
                                <TableCell>{broadcast.station}</TableCell>
                                <TableCell>{broadcast.language}</TableCell>
                                <TableCell>{getDayString(broadcast.days)}</TableCell>
                                <TableCell title={convertToLocalTime(broadcast.start, broadcast.end)}>{formatTime(broadcast.start)} - {formatTime(broadcast.end)}</TableCell>
                                <TableCell><Flag code={broadcast.country} style={{marginRight: "5px"}} height="15" width="25" /> <a target="_blank" href={`http://maps.google.com?q=` + broadcast.lat + "," + broadcast.lon}>{broadcast.location}</a></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            
                            rowsPerPageOptions={[]}
                            count={pageData.total}
                            rowsPerPage={pageData.per_page}
                            page={page}
                            onChangePage={handleChangePage}
                            
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}
