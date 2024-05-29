const express = require('express');
const path = require('path');
const app = express();

const advertisementsRoute = require('./routes/advertisements-route')
const userRoute = require('./routes/user-route')

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'static')))

const PORT = process.env.PORT || 3000
const UrlDB = process.env.URL_DB

app.use('/api/advertisements', advertisementsRoute)
app.use('/api/signin', userRoute)

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});