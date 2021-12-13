import React, { useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AmountInput, StyledInputBase } from './styledInputBase'
import { Alert, AlertTitle } from '@mui/material';
import { useSelector } from "react-redux";
import Paper from '@mui/material/Paper';

const WITHDRAW = "withdraw"
const DEPOSIT = "deposit"

// Displays total balance and have buttons to simulate cash withdraw and deposit
const Account = () => {
    const [depositAmount, setDepositAmount] = React.useState(0)
    const [withdrawAmount, setWithdrawAmount] = React.useState(0)
    const [spendingPower, setSpendingPower] = React.useState(0)
    const [displayErrorMsg, setDisplayErrorMsg] = React.useState("")
    const [errorMsg, setErrorMsg] = React.useState("")
    var email = useSelector(state => state.login.user)

    // The getSpendingPower function makes an axios get request that receives the user’s spending power.
    const getSpendingPower = () => {

        var headers = {
            'accept': 'application/json',
        };

        var data = {
            email: email,
        }

        var options = {
            method: 'GET',
            url: `${process.env.REACT_APP_BACKEND_API}/portfolios/`,
            headers: headers,
            params: data
        };

        axios(options).then(res => {
            console.log(res.data)
        })
    }

    const updateSpendingPower = (amt) => {
        var headers = {
            'Accept': '*/*',
            'Content-Type': '*/*',
        };

        var data = {
            email: email,
            amount: amt
        }

        axios.put(`${process.env.REACT_APP_BACKEND_API}/portfolios/`, data, headers).then(
            res => {
                console.log(res.data)
            }
        )
    }

    const handleUpdateSpendingPower = (e) => {
        e.preventDefault()
        if (e.target.id == WITHDRAW) {
            if (withdrawAmount > spendingPower) {
                setErrorMsg("Your withdraw amount exceeds your spending power.")
                setDisplayErrorMsg(true)
            } else {
                setSpendingPower(parseFloat(spendingPower) - parseFloat(withdrawAmount))
                updateSpendingPower(-withdrawAmount)
            }
        } else if (e.target.id == DEPOSIT) {
            if (depositAmount > 10000) {
                setErrorMsg("Cannot deposit more than $10000 at once.")
                setDisplayErrorMsg(true)
            } else {
                setSpendingPower(parseFloat(spendingPower) + parseFloat(depositAmount))
                updateSpendingPower(depositAmount)
            }
        }
    }

    useEffect(() => {
        getSpendingPower()
    }, [])

    const handleOnChangeWithdraw = (e) => {
        const re = /^[0-9]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            setWithdrawAmount(e.target.value)
        }
    }

    const handleOnChangeDeposit = (e) => {
        const re = /^[0-9]+$/
        if (e.target.value === '' || re.test(e.target.value)) {
            setDepositAmount(e.target.value)
        }
    }

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '32px',
                paddingLeft: '64px',
                paddingRight: '64px'
            }}
        >
            {
                displayErrorMsg ?
                    <Alert severity="error" onClose={() => setDisplayErrorMsg(false)} sx={{ marginBottom: '32px', marginTop: '16px' }}>
                        <AlertTitle>Error</AlertTitle>
                        {errorMsg}
                    </Alert>
                    : null
            }

            {/* Whenever we enter an amount and click on the withdraw 
            deposit buttons, we use useState to update the React component with
             the updated spendingPower and which calls updateSpendingPower 
             function that makes an axios put request that updates the user 
             portfolio in the database with the specified amount.  */}
            <Typography variant="h6" className="font-link"><strong>Spending Power:</strong> {Math.round(spendingPower * 100) / 100}</Typography>
            {/* <Typography variant="h6" className="font-link">Total Amount: {spendingPower}</Typography> */}
            <AmountInput>
                <StyledInputBase
                    placeholder="1000"
                    onChange={handleOnChangeDeposit}
                    value={depositAmount}
                    type="number"
                    inputProps={{ min: 0, max: 10000 }}
                />
            </AmountInput>
            <Button variant="contained" color="primary" id={DEPOSIT} onClick={handleUpdateSpendingPower}>Deposit Amount</Button>

            <AmountInput>
                <StyledInputBase
                    placeholder="1000"
                    onChange={handleOnChangeWithdraw}
                    value={withdrawAmount}
                    type="number"
                    inputProps={{ min: 0, max: spendingPower }}
                />
            </AmountInput>
            <Button variant="contained" color="primary" id={WITHDRAW} onClick={handleUpdateSpendingPower}>Withdraw Amount</Button>
        </Paper>
    )
}

export default Account
