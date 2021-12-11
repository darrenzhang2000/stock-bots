import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import AAPL_Json from './jsonTestReports/AAPL_test_report.json';


const HistoricalReports = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        setData(AAPL_Json)
    })

    return (
        <div>
            HistoricalReports page

            {data && data.length > 0 ?

                <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Spending Power</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Report</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.Date}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Date}
                                    </TableCell>
                                    <TableCell align="right">{row.Price}</TableCell>
                                    <TableCell align="right">{row.Quantity}</TableCell>
                                    <TableCell align="right">{row["Spending Power"]}</TableCell>
                                    <TableCell align="right">{row.Total}</TableCell>
                                    <TableCell align="right">{row.Report}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px', marginTop: '32px' }}> You do not own any stocks.</Typography>
            }
        </div>
    )
}

export default HistoricalReports
