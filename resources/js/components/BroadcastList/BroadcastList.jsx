import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter, Paper as div, Chip, makeStyles, Typography } from '@material-ui/core';
import Flag from 'react-world-flags';

import styles from './BroadcastList.module.css';
import { Link } from 'react-router-dom';

import { getDayString, convertToLocalTime, formatTime } from '../../api/';

export default function BroadcastList({broadcasts, pageData, changePage, usingUTC, toggleTimeFormat}) {
    
    if (pageData.total === undefined) return <></>;
    if (pageData.total === 0) return <Typography variant="h4">No results found</Typography>;

    // 1 = Sunday, 2 = Monday ... 7 = Saturday
    let today = new Date().getDay()+1;
    if (today === 8) today = 1;

    const handleChangePage = async (event, newPage) => {
        let url = ((pageData.current_page-1) < newPage) ? pageData.next_page_url : pageData.prev_page_url;
        changePage(url);
    }
    
    return (
        <div>
            <TableContainer style={{maxHeight: "40em"}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Frequency (kHz)</TableCell>
                            <TableCell>Station</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Days</TableCell>
                            <TableCell>Time 
                                <Chip 
                                label={(usingUTC) ? "UTC" : "Local time"}
                                onClick={() => toggleTimeFormat()}
                                style={{marginLeft: "5px"}}
                                />
                            </TableCell>
                            <TableCell>Broadcast Origin</TableCell>
                            <TableCell>Link</TableCell>{/* Displays a link to hear the broadcast, if it is live */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {broadcasts.map((broadcast, i) => 
                            <TableRow key={i}
                                component={Link}
                                hover
                                className={(broadcast.isLive === 1) ? "live" : ""}
                                to={{ pathname: `/broadcasts/${broadcast.id}` }}
                                style={{ textDecoration: "none" }}
                            >
                                <TableCell>{broadcast.freq}</TableCell>
                                <TableCell>{broadcast.station}</TableCell>
                                <TableCell>{broadcast.language}</TableCell>
                                <TableCell>{getDayString(broadcast.days)}</TableCell>
                                <TableCell title={convertToLocalTime(broadcast.start, broadcast.end)}>{formatTime(broadcast.start)} - {formatTime(broadcast.end)}</TableCell>
                                <TableCell><Flag code={broadcast.country} style={{marginRight: "5px"}} height="15" width="25" /> <a target="_blank" rel="noreferrer" href={`http://maps.google.com?q=${broadcast.coords}`}>{broadcast.location}</a></TableCell>

                                <TableCell>
                                    {(broadcast.isLive
                                        ? <a href={`websdr.ewi.utwente.nl:8901/?tune=${broadcast.freq}am`} target="_blank"  rel="noreferrer" title="Listen via UTwente's WebSDR (reception may vary)">📻</a>
                                        : <></>
                                    )}
                                </TableCell>
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
