import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import AAPL_Json from './jsonTestReports/AAPL_test_report.json';
import ADBE_Json from './jsonTestReports/ADBE_test_report.json';
import AMZN_Json from './jsonTestReports/AMZN_test_report.json';
import AVGO_Json from './jsonTestReports/AVGO_test_report.json';
import BAC_Json from './jsonTestReports/BAC_test_report.json';
import CRM_Json from './jsonTestReports/CRM_test_report.json';
import CSCO_Json from './jsonTestReports/CSCO_test_report.json';
import DIS_Json from './jsonTestReports/DIS_test_report.json';
import FB_Json from './jsonTestReports/FB_test_report.json';
import GOOGL_Json from './jsonTestReports/GOOGL_test_report.json';
import JNJ_Json from './jsonTestReports/JNJ_test_report.json';
import JPM_Json from './jsonTestReports/JPM_test_report.json';
import MSFT_Json from './jsonTestReports/MSFT_test_report.json';
import NFLX_Json from './jsonTestReports/NFLX_test_report.json';
import PFE_Json from './jsonTestReports/PFE_test_report.json';
import PG_Json from './jsonTestReports/PG_test_report.json';
import TMO_Json from './jsonTestReports/TMO_test_report.json';
import TSLA_Json from './jsonTestReports/TSLA_test_report.json';

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


const IndividualReports = () => {
    // Adding id to each row because DataGrid requires each row to have a unique id
    stocks.forEach(stock => {
        let obj = stockMap[stock]
        for (let i = 0; i < obj.length; i++) {
            obj[i].id = i
        }
    });

    const [data, setData] = useState(AAPL_Json)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [currentReport, setCurrentReport] = React.useState("AAPL")
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

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: 'Date', width: 100, valueGetter: (params) => `${params.row.Date}` },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            valueGetter: (params) => `${parseFloat(params.row.Price).toFixed(2)}`
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 80,
            valueGetter: (params) => `${params.row.Quantity}`
        },
        {
            field: 'spendingPower',
            headerName: 'Spending Power',
            width: 140,
            valueGetter: (params) => `${parseFloat(params.row["Spending Power"]).toFixed(2)}`
        },
        {
            field: 'total',
            headerName: 'Total',
            width: 100,
            valueGetter: (params) => `${parseFloat(params.row.Total).toFixed(2)}`
        },
        {
            field: 'report',
            headerName: 'Report',
            width: 800,
            valueGetter: (params) => `${params.row.Report}`
        },
    ]


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
                <Typography variant="h4" className="font-link" sx={{ marginTop: '32px' }}> Backtesting Reports</Typography>
                <Typography variant="h6" className="font-link" sx={{ marginTop: '32px' }}> <strong>Description</strong>: Displaying backtesting report for: <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'inline' }}> {currentReport}</Typography> </Typography>
                <Typography variant="h6" className="font-link" sx={{ marginTop: '32px' }}>
                    <strong>Summary</strong>: Over a three year period, this trading algorithm made a net gain of ${parseFloat(data[data.length - 1].Total - 10000).toFixed(2)}.
                This is a {parseFloat(100 * (data[data.length - 1].Total - 10000) / 10000).toFixed(2)}% increase. Initially starting out with $10000 on 2018-12-06, running this algorithm once every business
                day for the last 3 years ended with ${parseFloat(data[data.length - 1].Total).toFixed(2)} on 2021-12-08. </Typography>
                <Button
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ marginTop: '32px', marginBottom: '32px' }}
                >
                    Choose a different test report
            </Button>

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
            </Paper>
            {data && data.length > 0 ?
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '32px',
                        paddingLeft: '64px'
                    }}
                >
                    <div style={{ height: '800px', width: '100%' }}>
                        <DataGrid
                            rows={data}
                            columns={columns}
                            pageSize={25}
                            rowsPerPageOptions={[25]}
                            options={{ responsive: 'scroll' }}
                        // rowsPerPageOptions={25, 50, 100}
                        />
                    </div>
                </Paper>
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px', marginTop: '32px' }}> You do not own any stocks.</Typography>
            }
        </div>
    )
}

export default IndividualReports
