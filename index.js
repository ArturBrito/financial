const express = require('express');
const app = express();
const logger = require('./startup/logging');

require('./startup/db');
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
//app.listen(port, () => console.log(`Listening on port ${port}...`));
app.listen(port, () => logger.info(`Listening on port ${port}...`));