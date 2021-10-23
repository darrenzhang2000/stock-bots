import React, { useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'

const TransactionPage = (props) => {
    const [transactions, setTransactions] = React.useState([])

    const getTransactions = () => {
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': 'Ehmj9CLOzr9TB4gkqCiHp2u8HoZ2JiKC9qVRNeva'
        };

        var data = {
            email: 'testuser@gmail.com',
        }

        var options = {
            method: 'GET',
            url: 'http://localhost:5000/transactions/',
            headers: headers,
            params: data
        };

        axios(options).then(res => {
            setTransactions(res.data.transactions)
        })
    }

    useEffect(() => {
        console.log('transactions page')
        getTransactions()
    }, [])

    return (
        <div>
            <table>
                <tr>
                    <th>action</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>ticker</th>
                </tr>
            {
                transactions.map(transaction => <tr> 
                    <td>{transaction.action}</td>
                    <td>{transaction.price.$numberDecimal}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.ticker}</td>
                </tr>)
            }
            </table>
        </div>
    )
}

export default TransactionPage
