import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { AmountInput, StyledInputBase } from './styledInputBase'
import Button from '@mui/material/Button'
import axios from 'axios'

const WITHDRAW = "withdraw"
const DEPOSIT = "deposit"

const SavingsPage = () => {
    const [depositAmount, setDepositAmount] = React.useState(0)
    const [withdrawAmount, setWithdrawAmount] = React.useState(0)
    const [spendingPower, setSpendingPower] = React.useState(0)
    const [displayErrorMsg, setDisplayErrorMsg] = React.useState("")
    const [errorMsg, setErrorMsg] = React.useState("")


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

    // The getSpendingPower function makes an axios get request that receives the user’s spending power.
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

    const handleUpdateSpendingPower = () => {
        return 
    }

    useEffect(() => {
        getSpendingPower()
    }, [])

    return (
        <div>
            <Typography variant="h4" className="font-link"> Savings Page</Typography>
            
            <Typography variant="h6" className="font-link">Spending Power: {spendingPower}</Typography>

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

export default SavingsPage
