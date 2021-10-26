import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { Button, Typography, Alert, Grid } from '@mui/material';

const TrackedStockButton = (props) => {
    const { ticker } = props

    const handleAddTrackedStock = (e) => {
        e.preventDefault()
        console.log("clicked")

        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
            ticker
        }

        var options = {
            method: 'POST',
            url: 'http://localhost:5000/trackedStocks',
            headers: headers,
            data: qs.stringify(data)
        };

        axios(options).then(res => {
            console.log('added')
            console.log(res)
        })
    }

    return (
        <Button variant="contained" color="primary" onClick={handleAddTrackedStock}>Add Stock To Be Tracked By the Trading Algorithm</Button>
    )
}

export default TrackedStockButton
