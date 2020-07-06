/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:31:44
 * @modify date 07-07-2020 00:31:44
 * @desc Base project file
 */

const express = require('express');
const app = express();
const logger = require('./startup/logging');

//-- Start database connection and routes
require('./startup/db');
require('./startup/routes')(app);

//-- Start server
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));