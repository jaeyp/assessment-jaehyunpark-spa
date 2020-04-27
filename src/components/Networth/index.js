import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
    getMarketRates,
    getTransactionHistory
} from '../../services/shakepay'

const BTC_CAD_rate = 10796.48
const ETH_CAD_rate = 271.09
const TRANSACTION_TYPE = 'conversion'
const TRANSACTION_CREDIT = 'credit'
const TRANSACTION_DEBIT = 'debit'

export default () => {
    const history = useRef([])
    const exchangeLog = useRef([])
    const balance = useRef({ CAD: 0, BTC: 0, ETH: 0 })
    const [networths, setNetworths] = useState([])
    const [chartdata, setChartdata] = useState([])
    const [marketRatesBTC, setMarketRatesBTC] = useState(new Map())
    const [marketRatesETH, setMarketRatesETH] = useState(new Map())

    const calculateBalance = (currency) => {
        const filterByCredit = t => t.currency.includes(currency.toUpperCase()) && (t.direction && t.direction.includes(TRANSACTION_CREDIT))
        const filterByDebit = t => t.currency.includes(currency.toUpperCase()) && (t.direction && t.direction.includes(TRANSACTION_DEBIT))
        const credits = history.current.filter(filterByCredit)
        const debits = history.current.filter(filterByDebit)
        const add = (a, b) => {
            return { ...a, amount: Number(a.amount) + Number(b.amount) }
        }
        return credits.reduce(add).amount - debits.reduce(add).amount
    }
    const setRatesMapBTC = () => {
        getMarketRates('BTC').then(resp => {
            resp.forEach(d => {
                const key = d.createdAt.substring(0, 10)
                marketRatesBTC.set(key, d.midMarketRate)
            })
            setMarketRatesBTC(marketRatesBTC)
        })
    }
    const setRatesMapETH = () => {
        getMarketRates('ETH').then(resp => {
            resp.forEach(d => {
                const key = d.createdAt.substring(0, 10)
                marketRatesETH.set(key, d.midMarketRate)
            })
            setMarketRatesETH(marketRatesETH)
        })
    }

    useEffect(() => {
        setRatesMapBTC()
        setRatesMapETH()
        getTransactionHistory().then(resp => {
            const filter = t => t.type.includes(TRANSACTION_TYPE)
            history.current = resp.reverse()
            exchangeLog.current = history.current.filter(filter)
            balance.current.CAD = calculateBalance("CAD")
            balance.current.BTC = calculateBalance("BTC")
            balance.current.ETH = calculateBalance("ETH")

            const nws = exchangeLog.current.map((ex, i) => {
                balance.current[ex.from.currency] -= ex.from.amount
                balance.current[ex.to.currency] += ex.to.amount

                const date = ex.createdAt.substring(0, 10)
                //const nw = balance.current.CAD + (balance.current.BTC * BTC_CAD_rate) + (balance.current.ETH * ETH_CAD_rate)
                const nw = balance.current.CAD + (balance.current.BTC * marketRatesBTC.get(date)) + (balance.current.ETH * marketRatesETH.get(date))
                return { networth: nw, date: date }
            })
            setNetworths(nws)
        })
    }, [])

    useEffect(() => {
        const nwdata = {
            labels: networths.map(nw => nw.date),
            datasets: [
                {
                    label: 'growth',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: networths.map(nw => nw.networth)
                }
            ]
        }
        setChartdata(nwdata)
    }, [networths])

    return (
        <Container>
            <div className="header">
                Jaehyun Park
        </div>
            <div className="outer">
                <div className="inner">
                    <Line
                        data={chartdata}
                        options={{
                            title: {
                                display: true,
                                text: 'net worth over time',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
            <div className="footer">
                Shakepay Coding Assessment
        </div>
        </Container>
    )
}

const Container = styled.div`
    text-align: center;
    .header {
        margin: 20px;
        font-size: 2em;
        font-weight: 600;
    }
    .outer {
        display: flex;
        justify-content: center;
        width: 100vw;
        height: 80vh;
    }
    .inner {
        width: 80vw;
        background: white;
        overflow-x: hidden; 
        overflow-x: auto; 
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        margin-top: 20px;
    }
    .footer {
        margin: 20px;
        font-size: 1.2em;
    }
`