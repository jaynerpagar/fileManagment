const express = require('express');
const app = express();

const  Router  = require('./routes/index');
const setSecurityHeaders = require('./util/security');

const port = 3001;


app.set('trust proxy', 1);

// Body Parsing
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Use helmet for HSTS headers
setSecurityHeaders(app);


// Route Initialization
app.use('/', Router);

app.listen(port, () => console.log(`App started on port ${port}`));



