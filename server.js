const EXPRESS = require('express');
const APP = EXPRESS();
const path = require('path');

// middleware to serve static files
APP.use(EXPRESS.static(path.join(__dirname, 'public')));

// routes
APP.get('/', (request, response) => {
    response.sendFile('index.html');
});

APP.listen(3000, () => {
    console.log('Listening..........');
});