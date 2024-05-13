import React, { useState, useEffect } from 'react';
import { TextField, Typography, Grid, MenuItem, IconButton, Paper, Link } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { green } from '@mui/material/colors';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(() => localStorage.getItem('amount') || '1');
    const [currencyFrom, setCurrencyFrom] = useState(() => localStorage.getItem('currencyFrom') || 'EUR');
    const [currencyTo, setCurrencyTo] = useState(() => localStorage.getItem('currencyTo') || 'USD');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, []);

    useEffect(() => {
        localStorage.setItem('currencyFrom', currencyFrom);
        localStorage.setItem('currencyTo', currencyTo);
    }, [currencyFrom, currencyTo]);

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

    useEffect(() => {
        localStorage.setItem('amount', amount);
        handleConvert();
    }, [amount]);

    const handleRevert = () => {
        const temp = currencyFrom;
        setCurrencyFrom(currencyTo);
        setCurrencyTo(temp);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCurrencyChange = () => {
        handleConvert();
    };

    useEffect(() => {
        handleConvert();
    }, [exchangeRates, currencyFrom, currencyTo]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap:'10px' }}>
            <Paper sx={{ padding: '30px', maxWidth: '450px' }}>
                <Typography sx={{
                    marginBottom: 2,
                    textAlign: 'center',
                    fontSize: { xs: 'h5.fontSize', sm: 'h5.fontSize', lg: 'h4.fontSize' }
                }}
                    component="h1"
                >
                    Currency Converter
                </Typography>
                {Object.keys(exchangeRates).length > 0 && (
                    <Grid container spacing={{ xs: 1, sm: 2, lg: 2 }} alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                label="Amount"
                                variant="outlined"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                select
                                label="From"
                                variant="outlined"
                                value={currencyFrom}
                                onChange={(e) => {
                                    setCurrencyFrom(e.target.value);
                                    handleCurrencyChange();
                                }}
                                fullWidth
                                SelectProps={{ MenuProps: { PaperProps: { style: { maxHeight: 200 } } } }}
                            >
                                {Object.keys(exchangeRates).map(currency => (
                                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={2} style={{ textAlign: 'center' }}>
                            <IconButton onClick={handleRevert} size="medium">
                                <SwapHorizIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                select
                                label="To"
                                variant="outlined"
                                value={currencyTo}
                                onChange={(e) => {
                                    setCurrencyTo(e.target.value);
                                    handleCurrencyChange();
                                }}
                                fullWidth
                                SelectProps={{ MenuProps: { PaperProps: { style: { maxHeight: 200 } } } }}
                            >
                                {Object.keys(exchangeRates).map(currency => (
                                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {convertedAmount && (
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ textAlign: 'center' }}>
                                    {amount} {currencyFrom} = <Typography style={{ color: green[300] }} variant="string">{convertedAmount} {currencyTo}</Typography>
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Paper>
            <Typography variant='body1'>Made with 🧃 by <Link target="_blank" href="https://ronanscotet.com">Ronan Scotet</Link></Typography>
        </div>
    );

};

export default CurrencyConverter;
