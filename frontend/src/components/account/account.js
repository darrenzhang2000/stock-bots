<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AmountInput, StyledInputBase } from './styledInputBase'

const WITHDRAW = "withdraw"
const DEPOSIT = "deposit"



const Account = () => {
    const [spendingPower, setSpendingPower] = React.useState(0)
    const [amount, setAmount] = React.useState(0)

    const getSpendingPower = () => {
=======
import React, { useEffect } from 'react'
import axios from 'axios'

const Account = () => {
    const [amount, setAmount] = React.useState(0)
    const [spendingPower, setSpendingPower] = React.useState(0)

    const getspendingPower = () => {
>>>>>>> cf2fe4196f24adb0a69cc6fa9e4e2e9292cf8799
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
<<<<<<< HEAD
            setSpendingPower(res.data.portfolios[0].spendingPower)
        })
    }

    const updateSpendingPower = (amt) => {
        var headers = {
            'Accept': '*/*',
            'Content-Type': '*/*',
=======
            console.log(res)
            //setSpendingPower(res.data.portfolios[0].spendingPower)
        })
    }

    /*const updateSpendingPower = (amt) => {
        var headers = {
            'accept': 'application/json',
>>>>>>> cf2fe4196f24adb0a69cc6fa9e4e2e9292cf8799
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
            amount: amt
        }

<<<<<<< HEAD
        axios.put('http://localhost:5000/portfolios/', data, headers).then(
            res => {
                setSpendingPower(res.data.spendingPower)
            }
        )
    }

    const handleUpdateSpendingPower = (e) => {
        e.preventDefault()
        const intAmount = parseInt(amount)
        if (e.target.id == WITHDRAW) {
            // setSpendingPower(spendingPower - intAmount)
            updateSpendingPower(-intAmount)
        } else if (e.target.id == DEPOSIT) {
            // setSpendingPower(spendingPower + intAmount)
            updateSpendingPower(intAmount)
        }
    }

    useEffect(() => {
        getSpendingPower()
    }, [])

    return (
        <div>
            <Typography variant="h6" className="font-link">Spending Power: {spendingPower}</Typography>
            {/* <Typography variant="h6" className="font-link">Total Amount: {spendingPower}</Typography> */}
            <AmountInput>
                <StyledInputBase
                    placeholder="1000"
                    onChange={e => setAmount(e.target.value)}
                    value={amount}
                />
            </AmountInput>
            <Button variant="contained" color="primary" id={DEPOSIT} onClick={handleUpdateSpendingPower}>Deposit Amount</Button>
            <Button variant="contained" color="primary" id={WITHDRAW} onClick={handleUpdateSpendingPower}>Withdraw Amount</Button>
        </div>
    )
}

export default Account
=======
        var options = {
            method: 'PUT',
            url: 'http://localhost:5000/portfolios/',
            headers: headers,
            params: data
        };
    }*/
    const handleUpdateSpendingPower = e => {
        /*if(e.target.id == "WITHDRAW"){
            updateSpendingPower(-amount)
        }
        else{
            updateSpendingPower(amount)
        }*/
    }


        return <div>
            <p>
                spendingPower: {spendingPower}
            </p>
            <input type="number" min="0" />
            <button onClick={handleUpdateSpendingPower} id="WITHDRAW">
                Withdraw
            </button>
            <button onClick={handleUpdateSpendingPower} id="DEPOSIT">
                Deposit
            </button>
        </div>

    }

export default Account
>>>>>>> cf2fe4196f24adb0a69cc6fa9e4e2e9292cf8799
