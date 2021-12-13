import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

// This page maps through and display all of the user’s transactions. It makes a get request to the backend transactions route that gets the user’s transactions.
const TransactionPage = (props) => {
    const [transactions, setTransactions] = React.useState([])
    var email = useSelector(state => state.login.user)

    const getTransactions = () => {
        var headers = {
            'accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
        };

        var data = {
            email: email,
        }

        var options = {
            method: 'GET',
            url: `${process.env.REACT_APP_BACKEND_API}/transactions/`,
            headers: headers,
            params: data
        };

        axios(options).then(res => {
            if (!res.data.transactions) {
                return
            }
            // setTransactions(res.data.transactions.sort((a, b) => a.dateTime < b.dateTime ? 1 : -1))
            setTransactions(res.data.transactions.reverse())
        })
    }

    useEffect(() => {
        getTransactions()
    }, [])

    const columns = [
        {
            field: 'dateTime',
            headerName: 'Date',
            width: 200,
            valueGetter: (params) => `${params.row.dateTime.slice(0, 10)}`
        },
        {
            field: 'ticker',
            headerName: 'Ticker',
            width: 200,
            valueGetter: (params) => `${params.row.ticker}`
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            valueGetter: (params) => `${params.row.action}`
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 200,
            valueGetter: (params) => `${parseFloat(params.row.price.$numberDecimal).toFixed(2)}`
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 200,
            valueGetter: (params) => `${parseFloat(params.row.quantity).toFixed(2)}`
        },
    ]

    // Adding id to each transaction because DataGrid requires each row to have a unique id
    for (let i = 0; i < transactions.length; i++) {
        transactions[i].id = i
    }

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
                <Typography variant="h4" className="font-link" > Transactions Page</Typography>
            </Paper>
            { transactions && transactions.length != 0 ?

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
                            rows={transactions}
                            columns={columns}
                            pageSize={25}
                            rowsPerPageOptions={[25]}
                            options={{ responsive: 'scroll' }}
                        // rowsPerPageOptions={25, 50, 100}
                        />
                    </div>
                </Paper>

                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px' }}> You do not have any transactions.</Typography>
            }
        </div>
    )
}

export default TransactionPage
