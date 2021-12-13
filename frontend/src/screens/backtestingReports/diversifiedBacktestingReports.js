import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Diversified_Json from './diversifiedTestReports/3_year_diversified_test_report.json';

const reports = ['3_year_diversified_test_report.json']

const DiversifiedReports = () => {
    const [data, setData] = useState(Diversified_Json)

    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '32px',
                    paddingLeft: '64px'
                }}
            >
                <Typography variant="h4" className="font-link" sx={{  marginTop: '32px' }}> Backtesting Reports</Typography>
                <Typography variant="h6" className="font-link" sx={{  marginTop: '32px' }}>
                    <strong>Description</strong>: Displaying backtesting report for a diversified portfolio of stocks: <strong>PEP</strong>, <strong>GOOGL</strong>, <strong>FB</strong>, <strong>MSFT</strong>, <strong>JPM</strong>, <strong>TSLA</strong> </Typography>
                <Typography variant="h6" className="font-link" sx={{  marginTop: '32px' }}>
                    <strong>Summary</strong>: Over a three year period, this trading algorithm made a net gain of ${parseFloat(data[data.length - 1].Total - 10000).toFixed(2)}.
                This is a {parseFloat(100 * (data[data.length - 1].Total - 10000) / 10000).toFixed(2)}% increase. Initially starting out with $10000 on 2018-12-06, running this algorithm once every business
                day for the last 3 years ended with ${parseFloat(data[data.length - 1].Total).toFixed(2)} on 2021-12-08. </Typography>

            </Paper>
            {data && data.length > 0 ?

                <TableContainer component={Paper} sx={{ marginTop: '32px', marginBottom: '32px', paddingLeft: '64px', paddingRight: '64px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell align="right"><strong>Price</strong></TableCell>
                                <TableCell align="right"><strong>Quantity</strong></TableCell>
                                <TableCell align="right"><strong>Spending Power</strong></TableCell>
                                <TableCell align="right"><strong>Total</strong></TableCell>
                                <TableCell align="right"><strong>Report</strong></TableCell>
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
                                    <TableCell align="right">{parseFloat(row.Price).toFixed(2)}</TableCell>
                                    <TableCell align="right">{row.Quantity}</TableCell>
                                    <TableCell align="right">{parseFloat(row["Spending Power"]).toFixed(2)}</TableCell>
                                    <TableCell align="right">{parseFloat(row.Total).toFixed(2)}</TableCell>
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

export default DiversifiedReports
