import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import Diversified_Json from './diversifiedTestReports/3_year_diversified_test_report.json';

const reports = ['3_year_diversified_test_report.json']

const DiversifiedReports = () => {
    // Adding id to each row because DataGrid requires each row to have a unique id
    for (let i = 0; i < Diversified_Json.length; i++) {
        Diversified_Json[i].id = i
    }
    // Diversified_Json = JSON.parse(Diversified_Json)
    // console.log(Diversified_Json)
    const [data, setData] = useState(Diversified_Json)

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
                <Typography variant="h6" className="font-link" sx={{ marginTop: '32px' }}>
                    <strong>Description</strong>: Displaying backtesting report for a diversified portfolio of stocks: <strong>PEP</strong>, <strong>GOOGL</strong>, <strong>FB</strong>, <strong>MSFT</strong>, <strong>JPM</strong>, <strong>TSLA</strong> </Typography>
                <Typography variant="h6" className="font-link" sx={{ marginTop: '32px' }}>
                    <strong>Summary</strong>: Over a three year period, this trading algorithm made a net gain of ${parseFloat(data[data.length - 1].Total - 10000).toFixed(2)}.
                This is a {parseFloat(100 * (data[data.length - 1].Total - 10000) / 10000).toFixed(2)}% increase. Initially starting out with $10000 on 2018-12-06, running this algorithm once every business
                day for the last 3 years ended with ${parseFloat(data[data.length - 1].Total).toFixed(2)} on 2021-12-08. </Typography>

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

export default DiversifiedReports
