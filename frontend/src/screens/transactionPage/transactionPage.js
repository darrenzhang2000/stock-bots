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
            setTransactions(res.data.transactions)
        })
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <div>
            <Typography variant="h4" className="font-link" sx={{ marginBottom: '32px' }}> Transactions Page</Typography>
            { transactions ? <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>date</TableCell>
                            <TableCell>action</TableCell>
                            <TableCell>price</TableCell>
                            <TableCell>quantity</TableCell>
                            <TableCell>ticker</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.map(transaction => <TableRow>
                                <TableCell>{new Date(transaction.dateTime).toLocaleString()}</TableCell>
                                <TableCell>{transaction.action}</TableCell>
                                <TableCell>{transaction.price.$numberDecimal}</TableCell>
                                <TableCell>{transaction.quantity}</TableCell>
                                <TableCell>{transaction.ticker}</TableCell>
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
