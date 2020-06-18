import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from '@material-ui/core';
import Flag from 'react-world-flags';

import styles from './BroadcastList.module.css';

export default function BroadcastList({broadcasts, pageData, changePage}) {
    
    if (broadcasts.length < 1) { return (<div>Please search</div>)}

    // 1 = Sunday, 2 = Monday ... 7 = Saturday
    let today = new Date().getDay()+1;
    if (today === 8) today = 1;

    const handleChangePage = async (event, newPage) => {
        let url = ((pageData.current_page-1) < newPage) ? pageData.next_page_url : pageData.prev_page_url;
        changePage(url);
    }

    const getDayString = (days) => {
        days = days.toString();
        let formatted = "";

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
                        {broadcasts.map((broadcast, i) => 
                            <TableRow key={i} hover className={(broadcast.isLive === 1) ? "live" : ""}>
                                <TableCell>{broadcast.freq}</TableCell>
                                <TableCell>{broadcast.station}</TableCell>
                                <TableCell>{broadcast.language}</TableCell>
                                <TableCell>{getDayString(broadcast.days)}</TableCell>
                                <TableCell title={convertToLocalTime(broadcast.start, broadcast.end)}>{formatTime(broadcast.start)} - {formatTime(broadcast.end)}</TableCell>
                                <TableCell><Flag code={broadcast.country} style={{marginRight: "5px"}} height="15" width="25" /> <a target="_blank" href={`http://maps.google.com?q=${broadcast.coords}`}>{broadcast.location}</a></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            
                            rowsPerPageOptions={[]} /* Remove option for num. rows per page */
                            count={pageData.total}
                            rowsPerPage={pageData.per_page}
                            page={pageData.current_page-1}
                            onChangePage={handleChangePage}
                            
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}
