import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AAPL_Json from './jsonTestReports/AAPL_test_report.json';
import ADBE_Json from './jsonTestReports/ADBE_test_report.json'
import AMZN_Json from './jsonTestReports/AMZN_test_report.json'
import AVGO_Json from './jsonTestReports/AVGO_test_report.json'
import BAC_Json from './jsonTestReports/BAC_test_report.json'
import CRM_Json from './jsonTestReports/CRM_test_report.json'
import CSCO_Json from './jsonTestReports/CSCO_test_report.json'
import DIS_Json from './jsonTestReports/DIS_test_report.json'
import FB_Json from './jsonTestReports/FB_test_report.json'
import GOOGL_Json from './jsonTestReports/GOOGL_test_report.json'
import JNJ_Json from './jsonTestReports/JNJ_test_report.json'
import JPM_Json from './jsonTestReports/JPM_test_report.json'
import MSFT_Json from './jsonTestReports/MSFT_test_report.json'
import NFLX_Json from './jsonTestReports/NFLX_test_report.json'
import PFE_Json from './jsonTestReports/PFE_test_report.json'
import PG_Json from './jsonTestReports/PG_test_report.json'
import TMO_Json from './jsonTestReports/TMO_test_report.json'
import TSLA_Json from './jsonTestReports/TSLA_test_report.json'

const stocks = ['AAPL', 'ADBE', 'AMZN', 'AVGO', 'BAC', 'CRM', 'CSCO', 'DIS', 'FB', 'GOOGL', 'JNJ', 'JPM', 'MSFT', 'NFLX', 'PFE', 'PG', 'TMO', 'TSLA']
const reports = ['AAPL_test_report.json', 'ADBE_test_report.json', 'AMZN_test_report.json', 'AVGO_test_report.json', 'BAC_test_report.json', 'CRM_test_report.json', 'CSCO_test_report.json', 'DIS_test_report.json', 'FB_test_report.json', 'GOOGL_test_report.json', 'JNJ_test_report.json', 'JPM_test_report.json', 'MSFT_test_report.json', 'NFLX_test_report.json', 'PFE_test_report.json', 'PG_test_report.json', 'TMO_test_report.json', 'TSLA_test_report.json']
const stockMap = {
    'AAPL': AAPL_Json, 
    'ADBE': ADBE_Json,
    'AMZN': AMZN_Json, 
    'AVGO': AVGO_Json, 
    'BAC': BAC_Json, 
    'CRM': CRM_Json, 
    'CSCO': CSCO_Json, 
    'DIS': DIS_Json,
    'FB': FB_Json, 
    'GOOGL': GOOGL_Json, 
    'JNJ': JNJ_Json, 
    'JPM': JPM_Json, 
    'MSFT': MSFT_Json, 
    'NFLX': NFLX_Json, 
    'PFE': PFE_Json, 
    'PG': PG_Json, 
    'TMO': TMO_Json, 
    'TSLA': TSLA_Json
}


const HistoricalReports = () => {
    const [data, setData] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentReport, setCurrentReport] = React.useState("")
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenReport = e => {
        var currentStockName = e.target.id
        setCurrentReport(currentStockName)
        setData(stockMap[currentStockName])
    }

    return (
        <div>
            HistoricalReports page
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Choose your test report
            </Button>
            Displaying backtesting report for: {currentReport}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    stocks.map((stock, idx) => <MenuItem
                     id={stock} 
                     onClick={handleOpenReport}
                     > {stock} </MenuItem>)
                }
            </Menu>

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
