const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const path          = require('path');
const port          = 8080;
const routes        = require('./routes');

// Midleware to accept JSON.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Create a static directory for express.
app.use(express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});