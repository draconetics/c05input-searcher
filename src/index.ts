import app from './app'
const {PORT} = require('./config/portConfig')
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT} with typescript`);
});