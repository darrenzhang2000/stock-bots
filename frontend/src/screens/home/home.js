import { Divider, Typography } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';

const Home = () => {
    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '64px'
                }}
            >
                <Typography variant="h4" className="font-link">Welcome to the Stock Bot Home Page</Typography>
            </Paper>
            <Divider />
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h6" className="font-link">
                    Stockbots is your personal, automated trading platform.
                    It requires zero effort from you and will help you beat inflation
                    and the market in general. StockBots mission is to be the beset
                    trading platform in the world and help you achieve financial
                    freedom.
            </Typography>
            </Paper>
        </div>
    )
}

export default Home
