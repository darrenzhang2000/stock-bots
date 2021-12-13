import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

const TrackedStocks = () => {
    const [trackedStocks, setTrackedStocks] = React.useState([])
    var email = useSelector(state => state.login.user)

    // The get request queries the OwnedStock in the database to 
    // get all of the stocks owned by the user with the specified 
    // email
    const getTrackedStocks = async () => {

        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_BACKEND_API}/trackedStocks/?email=${email}`,
        };

        axios(config)
            .then(function (response) {
                let temp = response.data.trackedStocks
                for (let i = 0; i < temp.length; i++) {
                    temp[i].id = i
                }
                setTrackedStocks(temp)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        getTrackedStocks()
    }, [])

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'ticker',
            headerName: 'Ticker',
            width: 300,
            valueGetter: (params) => `${params.row.ticker}`
        }
    ]

    return (
        <div>
            {trackedStocks && trackedStocks.length > 0 ?
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '32px',
                        paddingLeft: '64px',
                        marginLeft: '32px',
                        marginRight: '32px'
                    }}
                >
                    <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px' }}> Stocks Tracked By Trading Algorithm</Typography>

                    <div style={{ height: '350px', width: '300px', }}>
                        <DataGrid
                            rows={trackedStocks}
                            columns={columns}
                            pageSize={25}
                            rowsPerPageOptions={[25]}
                            options={{ responsive: 'scroll' }}
                        // rowsPerPageOptions={25, 50, 100}
                        />
                    </div>
                </Paper>
    
                : <Typography variant="h6" className="font-link" sx={{ marginBottom: '32px', marginTop: '32px', marginLeft: '32px' }}> No stocks are being tracked by the trading algorithm.</Typography>
            }
        </div>
    )
}

export default TrackedStocks
