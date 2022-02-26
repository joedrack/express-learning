const express = require('express');
const path = require('path')

const app = express();

const PORT  = process.env.PORT || 3000;

// serving static files
// app.use(express.static('./static'));
app.use(express.static('./learn-express/static'))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'static', 'index.html'));
})

app.all('/*', (req, res) => {
    res.status(404).send('File Not Found');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));