import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from '@material-ui/core';
import Flag from 'react-world-flags';

import { fetchOptions, getChangePageData } from '../../api';

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
    
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Frequency (kHz)</TableCell>
                            <TableCell>Station</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Broadcast Origin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchedBroadcasts.map((broadcast, i) => 
                            <TableRow key={i} hover>
                                <TableCell>{broadcast.freq}</TableCell>
                                <TableCell>{broadcast.station}</TableCell>
                                <TableCell>{broadcast.language}</TableCell>
                                <TableCell>{broadcast.time}</TableCell>
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
