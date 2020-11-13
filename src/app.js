const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use('/api/note', require('./routes/note.routes'));

app.use('/', require('./routes/site.routes'));

const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
