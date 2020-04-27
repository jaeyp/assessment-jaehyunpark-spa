import axios from 'axios';

const on401 = _ => { window.location.href = '/login' }
const on404 = _ => { window.location.href = '/page404' }

const custom_handlers = {
    401: on401,
    404: on404,
}

const errorHandle = defaultHandle => code => custom_handlers[code] || defaultHandle(code)
const handle = errorHandle(code => Promise.reject(`Request error (${code})`))

const getConstantRates = () => {
    return axios.get('https://api.shakepay.co/rates')
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}
const getMarketRates = (currency) => {
    return axios.get(`https://shakepay.github.io/programming-exercise/web/rates_CAD_${currency.toUpperCase()}.json`)
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}
const getTransactionHistory = () => {
    return axios.get('https://shakepay.github.io/programming-exercise/web/transaction_history.json')
        .then(
            response => response.data,
            rejected => handle(rejected.response.status)
        )
}

export {
    getConstantRates,
    getMarketRates,
    getTransactionHistory
}