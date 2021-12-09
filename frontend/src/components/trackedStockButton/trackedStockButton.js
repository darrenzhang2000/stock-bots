import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { Button, Typography, Alert, Grid } from '@mui/material';
import { useSelector } from "react-redux";

// This button adds the stock in the stock info page to be tracked by
// our trading algorithm. We felt that this button was complex enough that
// we decided to refactor it into its own component. The button sends
// an axios post request to our backend that adds the stock ticker to the 
// list of tickers currently tracked by the trading algorithm.
const TrackedStockButton = (props) => {
    var email = useSelector(state => state.login.user)
    const { ticker } = props

    const handleAddTrackedStock = (e) => {
        e.preventDefault()

        var headers = {
            'accept': 'application/json',
        };

        var data = {
            email: email,
            ticker
        }

        var options = {
            method: 'POST',
            url: 'http://localhost:5000/trackedStocks',
            headers: headers,
            data: qs.stringify(data)
        };

        axios(options).then(res => {
            console.log(res)
        })
    }

    return (
        <Button variant="contained" color="primary" onClick={handleAddTrackedStock}>Add Stock To Be Tracked By the Trading Algorithm</Button>
    )
}

export default TrackedStockButton
