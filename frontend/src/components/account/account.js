import React, { useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AmountInput, StyledInputBase } from './styledInputBase'
import { Alert, AlertTitle } from '@mui/material';

const WITHDRAW = "withdraw"
const DEPOSIT = "deposit"

const Account = () => {
    const [depositAmount, setDepositAmount] = React.useState(0)
    const [withdrawAmount, setWithdrawAmount] = React.useState(0)
    const [spendingPower, setSpendingPower] = React.useState(0)
    const [displayErrorMsg, setDisplayErrorMsg] = React.useState("")
    const [errorMsg, setErrorMsg] = React.useState("")

    const getSpendingPower = () => {

        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
        }

        var options = {
            method: 'GET',
            url: 'http://localhost:5000/portfolios/',
            headers: headers,
            params: data
        };

        axios(options).then(res => {
            setSpendingPower(res.data.portfolios[0].spendingPower.$numberDecimal)
        })
    }

    const updateSpendingPower = (amt) => {
        var headers = {
            'Accept': '*/*',
            'Content-Type': '*/*',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
            amount: amt
        }

        axios.put('http://localhost:5000/portfolios/', data, headers).then(
            res => {
                setSpendingPower(res.data.spendingPower.$numberDecimal)
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
                updateSpendingPower(-withdrawAmount)
            }
        } else if (e.target.id == DEPOSIT) {
            if (depositAmount > 10000) {
                setErrorMsg("Cannot deposit more than $10000 at once.")
                setDisplayErrorMsg(true)
            } else {
                updateSpendingPower(depositAmount)
            }
        }
    }

    useEffect(() => {
        getSpendingPower()
    }, [])

    const handleOnChangeWithdraw = (e) => {
        const re = /^[0-9]+$/
        console.log(re.test(e.target.value))
        console.log(e.target.value)
        if (e.target.value === '' || re.test(e.target.value)) {
            setWithdrawAmount(e.target.value)
        }
    }

    const handleOnChangeDeposit = (e) => {
        const re = /^[0-9]+$/
        console.log(re.test(e.target.value))
        console.log(e.target.value)
        if (e.target.value === '' || re.test(e.target.value)) {
            setDepositAmount(e.target.value)
        }
    }

    return (
        <div>
            {
                displayErrorMsg ?
                    <Alert severity="error" onClose={() => setDisplayErrorMsg(false)} sx={{marginBottom: '32px', marginTop: '16px'}}>
                        <AlertTitle>Error</AlertTitle>
                        {errorMsg}
                    </Alert>
                    : null
            }

            <Typography variant="h6" className="font-link">Spending Power: {spendingPower}</Typography>
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
        </div>
    )
}

export default Account
