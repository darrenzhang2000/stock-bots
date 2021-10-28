import React, { useEffect } from 'react'
import axios from 'axios'

const Account = () => {
    const [amount, setAmount] = React.useState(0)
    const [spendingPower, setSpendingPower] = React.useState(0)

    const getspendingPower = () => {
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
            console.log(res)
            //setSpendingPower(res.data.portfolios[0].spendingPower)
        })
    }

    /*const updateSpendingPower = (amt) => {
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
            amount: amt
        }

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