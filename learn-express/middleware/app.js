const express = require('express');

const app = express();

// middlewares
const logger = require('./midllewares/logger');
const authorize = require('./midllewares/authorize');

const PORT = process.env.PORT || 1000;

// applying the logger middleware to each routes when get used instead of doing it manually
app.use('/api', [logger, authorize]) // to run more than one middleware, we need to put them in a array, notice that the order matters

app.get('/', (req, res) => {
    res.send('cool');
});

app.get('/about', (req, res) => {
    res.send('This is the about page');
});

// if I wanna appy the middleware to this route only, I will not use #use but #http methods instead as #get, #post, etc
// app.get('/api/products', [logger, authorize] ,(req, res) => {}) ?????????????

app.get('/api/products', (req, res) => {
    console.log(JSON.stringify(req.user));
    res.send('Products page...');
});

app.get('/api/about', (req, res) => {
    res.send('About the API');
})
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
