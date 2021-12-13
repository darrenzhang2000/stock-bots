import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
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
            if(!res.data.transactions){
                return
            }
            // setTransactions(res.data.transactions.sort((a, b) => a.dateTime < b.dateTime ? 1 : -1))
            setTransactions(res.data.transactions.reverse())
            console.log(transactions)
        })
    }

    useEffect(() => {
        getTransactions()
    }, [])

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
            { transactions && transactions.length != 0 ? <TableContainer sx={{ paddingLeft: '64px', paddingRight: '64px'}} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Ticker</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Quantity</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.map((transaction, idx) => <TableRow id={idx}>
                                <TableCell>{new Date(transaction.dateTime).toLocaleString()}</TableCell>
                                <TableCell>{transaction.ticker}</TableCell>
                                <TableCell>{transaction.action}</TableCell>
                                <TableCell>{parseFloat(transaction.price.$numberDecimal).toFixed(2)}</TableCell>
                                <TableCell>{transaction.quantity}</TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px' }}> You do not have any transactions.</Typography>
            }
        </div>
    )
}

export default TransactionPage
