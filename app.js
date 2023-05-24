const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const moment = require('moment');
app.locals.moment = moment;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/news'));

app.get('/:image', (req, res) => {
    res.sendFile(__dirname + '/' + req.params.image);
});

app.set('views', './views');

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
