// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const fileUpload = require('express-fileupload');


// Import Routes
// const auditlogRoutes = require('./api/v1/routes/AuditlogRoutes');
const resourcesRoutes = require('./api/v1/routes/ResourceRoutes');
const reviewRoutes = require('./api/v1/routes/ReviewRoutes');
const bookmarkRoutes = require('./api/v1/routes/BookmarkRoutes');
const clientRoutes = require('./api/v1/routes/ClientRoutes')
const imageRoutes = require('./api/v1/routes/ImageRoutes')

// Instantiate App
const app = express();
app.use(cors());
app.use(express.json());
// app.use(fileUpload());
//app.use(fileUpload({ useTempFiles: true }));


// Use Middleware
app.use(morgan('tiny'));


// Use Routes
app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/bookmark', bookmarkRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/resource', resourcesRoutes);
app.use('/api/v1/image', imageRoutes);
// app.use('/api/v1/auditlog', auditlogRoutes);



module.exports = app;
