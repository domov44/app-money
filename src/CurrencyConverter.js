import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
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
                            onChange={(e) => setCurrencyFrom(e.target.value)}
                            fullWidth
                        >
                            {Object.keys(exchangeRates).map(currency => (
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
                            onChange={(e) => setCurrencyTo(e.target.value)}
                            fullWidth
                        >
                            {Object.keys(exchangeRates).map(currency => (
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
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h6" style={{ marginTop: 16 }}>
                                    Exchange Rates
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{ width: '100%' }}>
                                    {Object.entries(exchangeRates).map(([currency, rate]) => (
                                        <Typography key={currency} variant="body1">
                                            1 {currencyFrom} = {Number(rate).toFixed(2)} {currency}
                                        </Typography>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default CurrencyConverter;

