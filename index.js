const express = require('express');
const fetch = require('node-fetch');

var PORT = process.env.PORT || 3000;

const app = express();

let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
        
        today = mm + '-' + dd + '-' + yyyy;

app.get("/", async (req, res) => {
    const url = "https://api.exchangeratesapi.io/latest";
    const options = {
        "method": "GET",
    };
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(e => {
            res.status(404).json({ "message": "Invalid data", error: e, });
        });

    res.status(200).json({
        results: {
            base: response.base,
            date: today,
            rates: response.rates
        }
    });
});

app.get("/api/rates", async (req, res) => {
    const base = req.query.base;
    const currency = req.query.symbols;
    
    const url = `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`;
    const options = {
        "method": "GET",
    };
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(e => {
            res.status(404).json({ "message": "Invalid data", error: e, });
        });

    res.status(200).json({
        results: {
            base: response.base,
            date: today,
            rates: response.rates
        }
    });
});

app.listen(PORT, (error) => {
    if(error) throw error
    console.log('App listening on PORT', PORT);
});