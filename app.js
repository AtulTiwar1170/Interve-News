const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai")
require('dotenv').config()
const APIKEY = process.env.KEY;
const genAI = new GoogleGenerativeAI(APIKEY);

const API_KEY = process.env.ALPHA;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=API_KEY');
        const data = await response.json();

        res.render('index', { data });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching new information' });
    }
});
app.get('/crypto', async (req, res) => {
    res.render('crypto');

});
app.get('/heat_map_based_on_sector', async (req, res) => {
    res.render('Heat_Map_based_On_sector', { ques, ans });

});

let ques;
let ans;
app.post('/Chat', async (req, res) => {
    try {
        const { question } = req.body;
        ques = question;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const prompt = question;
        if (prompt) {
            const result = await model.generateContent(prompt);
            const mainResult = result.response.text();
            ans = mainResult;
            res.render("Crypto_Coin_heat_map", { ques, ans });
        } 
    } catch (error) {
        res.send(error.message);
    }
});
app.get('/crypto_coins_heat_map', async (req, res) => {
    
    res.render("Crypto_Coin_heat_map", { ques , ans });
});
app.get('/Charts', async (req, res) => {
    res.render('Charts');
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
