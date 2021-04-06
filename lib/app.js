const express = require('express');
const app = express();



app.use(express.static(`${__dirname}/../public`));
app.use(express.json());


app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/api/orders', require('./controllers/orders-router'));
app.use((err, req, res, next) => {
    res.status(404)
    res.json({ error: err.message })
})


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
