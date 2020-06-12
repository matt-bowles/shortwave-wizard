import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TableFooter } from '@material-ui/core';
import Flag from 'react-world-flags';

export default function BroadcastList({broadcasts, pageData}) {
    
    if (broadcasts.length == 0) {
        return (
            <div>
                Please search
            </div>
        )
    }
    
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Frequency</TableCell>
                            <TableCell>Station</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Broadcast Origin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {broadcasts.map((broadcast, i) => 
                            <TableRow key={i} hover>
                                <TableCell>{broadcast.freq}</TableCell>
                                <TableCell>{broadcast.station}</TableCell>
                                <TableCell>{broadcast.language}</TableCell>
                                <TableCell>{broadcast.time}</TableCell>
                                <TableCell><Flag code={broadcast.country} style={{marginRight: "5px"}} height="15" width="25" />{broadcast.location} </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            page = "1"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}
