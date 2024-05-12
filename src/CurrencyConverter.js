import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [currencyFrom, setCurrencyFrom] = useState(localStorage.getItem('lastCurrencyFrom') || 'EUR');
    const [currencyTo, setCurrencyTo] = useState(localStorage.getItem('lastCurrencyTo') || 'MAD');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const storedRates = localStorage.getItem('exchangeRates');
                if (storedRates) {
                    setExchangeRates(JSON.parse(storedRates));
                } else {
                    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
                    const data = await response.json();
                    setExchangeRates(data.rates);
                    localStorage.setItem('exchangeRates', JSON.stringify(data.rates));
                }
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, []);

    const handleConvert = () => {
        const amountFloat = parseFloat(amount);
        if (!isNaN(amountFloat)) {
            const conversionRate = exchangeRates[currencyTo] / exchangeRates[currencyFrom];
            const converted = amountFloat * conversionRate;
            setConvertedAmount(converted.toFixed(2));
        } else {
            setConvertedAmount('');
        }
    };

    const handleCurrencyFromChange = (e) => {
        const selectedCurrency = e.target.value;
        setCurrencyFrom(selectedCurrency);
        localStorage.setItem('lastCurrencyFrom', selectedCurrency);
    };

    const handleCurrencyToChange = (e) => {
        const selectedCurrency = e.target.value;
        setCurrencyTo(selectedCurrency);
        localStorage.setItem('lastCurrencyTo', selectedCurrency);
    };

    // Liste statique des devises disponibles
    const currencies = ['EUR', 'MAD'];

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ maxWidth: 400, padding: 16, borderRadius: 8, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <Typography variant="h4" style={{ marginBottom: 16 }}>
                    Currency Converter
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="From"
                            variant="outlined"
                            value={currencyFrom}
                            onChange={handleCurrencyFromChange}
                            fullWidth
                        >
                            {currencies.map(currency => (
                                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="To"
                            variant="outlined"
                            value={currencyTo}
                            onChange={handleCurrencyToChange}
                            fullWidth
                        >
                            {currencies.map(currency => (
                                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleConvert} fullWidth>
                            Convert
                        </Button>
                    </Grid>
                    {convertedAmount && (
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                {amount} {currencyFrom} = {convertedAmount} {currencyTo}
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </div>
        </div>
    );
};

export default CurrencyConverter;



