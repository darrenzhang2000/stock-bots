import { Divider, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import StockBotImage from './stockbot.jpg';
import StockImage from './stocks.jpg';

/*
This is the home/about page that describes what our app does
*/
const Home = () => {
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
                <Typography variant="h4" className="font-link">Welcome to the Stock Bot Home Page</Typography>
            </Paper>
            <Divider />
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '64px'
                }}
            >

                <Grid container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <img src={StockBotImage} width="400px" height="auto" style={{ marginBottom: '32px' }} />
                    <img src={StockImage} width="400px" height="auto" style={{ marginBottom: '32px' }} />

                    <Typography variant="h6" className="font-link">
                        <strong>Mission:</strong> Stockbots is your personal, automated trading platform.
                    It requires zero effort from you and will help you beat inflation
                    and the market in general. StockBots mission is to be the beset
                    trading platform in the world and help you achieve financial
                    freedom.
                </Typography>
                </Grid>
                <Typography variant="h6" className="font-link" sx={{ marginTop: '32px' }}>
                    <strong>Our Service</strong>:
                    The centerpiece of our service is our trading algorithm. All you have to do is tell our site what stock
                    we can buy or sell with, say Google for example, and some money that it can use, and our stock bot will do all of your trading
                    for you! No more tireless researching or trying to compete with the stock gurus on TV. Our algorithm does everything
                    so you can live your life.
                </Typography>
                <Typography variant="h6" className="font-link" sx={{ marginTop: '32px' }}>
                    <strong>Our Algorithm</strong>:
                    Team Stock Bots works to adjust our algorithm, improving and testing it to ensure it can make the most accurate
                    predictions possible, and more importantly, make its users as much money as possible.
                </Typography>
            </Paper>
        </div>
    )
}

export default Home
