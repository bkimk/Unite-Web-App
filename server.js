// Entry point for the application
const app = require('./src/index')

// Run Server
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log('Server started on port 3000'));
