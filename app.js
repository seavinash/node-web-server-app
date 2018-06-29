const hbs = require('hbs');
const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'hbs');
app.set('views', './app-views');
hbs.registerPartials(__dirname + '/app-views' );

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method} ${req.url} \n`;
    fs.appendFile('server.log', log, (e) => {
        if(e) {
            console.log('Unable to write to the file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/assets'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('toUppercase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});
