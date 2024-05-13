import React, { useState, useEffect } from 'react';
import { TextField, Typography, Grid, MenuItem, IconButton, Paper, Link } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { green } from '@mui/material/colors';

const currencyNames = {
    EUR: 'Euro',
    AED: 'United Arab Emirates Dirham',
    AFN: 'Afghan Afghani',
    ALL: 'Albanian Lek',
    AMD: 'Armenian Dram',
    ANG: 'Netherlands Antillean Guilder',
    AOA: 'Angolan Kwanza',
    ARS: 'Argentine Peso',
    AUD: 'Australian Dollar',
    AWG: 'Aruban Florin',
    AZN: 'Azerbaijani Manat',
    BAM: 'Bosnia-Herzegovina Convertible Mark',
    BBD: 'Barbadian Dollar',
    BDT: 'Bangladeshi Taka',
    BGN: 'Bulgarian Lev',
    BHD: 'Bahraini Dinar',
    BIF: 'Burundian Franc',
    BMD: 'Bermudian Dollar',
    BND: 'Brunei Dollar',
    BOB: 'Bolivian Boliviano',
    BRL: 'Brazilian Real',
    BSD: 'Bahamian Dollar',
    BTN: 'Bhutanese Ngultrum',
    BWP: 'Botswana Pula',
    BYN: 'Belarusian Ruble',
    BZD: 'Belize Dollar',
    CAD: 'Canadian Dollar',
    CDF: 'Congolese Franc',
    CHF: 'Swiss Franc',
    CLP: 'Chilean Peso',
    CNY: 'Chinese Yuan',
    COP: 'Colombian Peso',
    CRC: 'Costa Rican Colón',
    CUP: 'Cuban Peso',
    CVE: 'Cape Verdean Escudo',
    CZK: 'Czech Koruna',
    DJF: 'Djiboutian Franc',
    DKK: 'Danish Krone',
    DOP: 'Dominican Peso',
    DZD: 'Algerian Dinar',
    EGP: 'Egyptian Pound',
    ERN: 'Eritrean Nakfa',
    ETB: 'Ethiopian Birr',
    FJD: 'Fijian Dollar',
    FKP: 'Falkland Islands Pound',
    FOK: 'Faroese Króna',
    GBP: 'British Pound',
    GEL: 'Georgian Lari',
    GGP: 'Guernsey Pound',
    GHS: 'Ghanaian Cedi',
    GIP: 'Gibraltar Pound',
    GMD: 'Gambian Dalasi',
    GNF: 'Guinean Franc',
    GTQ: 'Guatemalan Quetzal',
    GYD: 'Guyanese Dollar',
    HKD: 'Hong Kong Dollar',
    HNL: 'Honduran Lempira',
    HRK: 'Croatian Kuna',
    HTG: 'Haitian Gourde',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Shekel',
    IMP: 'Isle of Man Pound',
    INR: 'Indian Rupee',
    IQD: 'Iraqi Dinar',
    IRR: 'Iranian Rial',
    ISK: 'Icelandic Króna',
    JEP: 'Jersey Pound',
    JMD: 'Jamaican Dollar',
    JOD: 'Jordanian Dinar',
    JPY: 'Japanese Yen',
    KES: 'Kenyan Shilling',
    KGS: 'Kyrgyzstani Som',
    KHR: 'Cambodian Riel',
    KID: 'Kiribati Dollar',
    KMF: 'Comorian Franc',
    KRW: 'South Korean Won',
    KWD: 'Kuwaiti Dinar',
    KYD: 'Cayman Islands Dollar',
    KZT: 'Kazakhstani Tenge',
    LAK: 'Lao Kip',
    LBP: 'Lebanese Pound',
    LKR: 'Sri Lankan Rupee',
    LRD: 'Liberian Dollar',
    LSL: 'Lesotho Loti',
    LYD: 'Libyan Dinar',
    MAD: 'Moroccan Dirham',
    MDL: 'Moldovan Leu',
    MGA: 'Malagasy Ariary',
    MKD: 'Macedonian Denar',
    MMK: 'Burmese Kyat',
    MNT: 'Mongolian Tögrög',
    MOP: 'Macanese Pataca',
    MRU: 'Mauritanian Ouguiya',
    MUR: 'Mauritian Rupee',
    MVR: 'Maldivian Rufiyaa',
    MWK: 'Malawian Kwacha',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    MZN: 'Mozambican Metical',
    NAD: 'Namibian Dollar',
    NGN: 'Nigerian Naira',
    NIO: 'Nicaraguan Córdoba',
    NOK: 'Norwegian Krone',
    NPR: 'Nepalese Rupee',
    NZD: 'New Zealand Dollar',
    OMR: 'Omani Rial',
    PAB: 'Panamanian Balboa',
    PEN: 'Peruvian Sol',
    PGK: 'Papua New Guinean Kina',
    PHP: 'Philippine Peso',
    PKR: 'Pakistani Rupee',
    PLN: 'Polish Złoty',
    PYG: 'Paraguayan Guaraní',
    QAR: 'Qatari Riyal',
    RON: 'Romanian Leu',
    RSD: 'Serbian Dinar',
    RUB: 'Russian Ruble',
    RWF: 'Rwandan Franc',
    SAR: 'Saudi Riyal',
    SBD: 'Solomon Islands Dollar',
    SCR: 'Seychellois Rupee',
    SDG: 'Sudanese Pound',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    SHP: 'Saint Helena Pound',
    SLE: 'Sierra Leonean Leone',
    SLL: 'Sierra Leonean Leone',
    SOS: 'Somali Shilling',
    SRD: 'Surinamese Dollar',
    SSP: 'South Sudanese Pound',
    STN: 'São Tomé and Príncipe Dobra',
    SYP: 'Syrian Pound',
    SZL: 'Eswatini Lilangeni',
    THB: 'Thai Baht',
    TJS: 'Tajikistani Somoni',
    TMT: 'Turkmenistani Manat',
    TND: 'Tunisian Dinar',
    TOP: 'Tongan Paʻanga',
    TRY: 'Turkish Lira',
    TTD: 'Trinidad and Tobago Dollar',
    TVD: 'Tuvaluan Dollar',
    TWD: 'New Taiwan Dollar',
    TZS: 'Tanzanian Shilling',
    UAH: 'Ukrainian Hryvnia',
    UGX: 'Ugandan Shilling',
    USD: 'United States Dollar',
    UYU: 'Uruguayan Peso',
    UZS: 'Uzbekistani Soʻm',
    VES: 'Venezuelan Bolívar Soberano',
    VND: 'Vietnamese Đồng',
    VUV: 'Vanuatu Vatu',
    WST: 'Samoan Tālā',
    XAF: 'Central African CFA Franc',
    XCD: 'East Caribbean Dollar',
    XDR: 'Special Drawing Rights',
    XOF: 'West African CFA Franc',
    XPF: 'CFP Franc',
    YER: 'Yemeni Rial',
    ZAR: 'South African Rand',
    ZMW: 'Zambian Kwacha',
    ZWL: 'Zimbabwean Dollar'
};

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: '10px' }}>
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
                                    <MenuItem key={currency} value={currency}>
                                        {currency} - {currencyNames[currency]}
                                    </MenuItem>
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
                                    <MenuItem key={currency} value={currency}>
                                        {currency} - {currencyNames[currency]}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {convertedAmount && (
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ textAlign: 'center' }}>
                                    {amount} {currencyFrom} = <Typography style={{ color: green[300] }} component="span">{convertedAmount} {currencyTo}</Typography>
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
