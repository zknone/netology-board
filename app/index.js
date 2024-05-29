const express = require('express');
const path = require('path');
const app = express();

const advertisementsRoute = require('./routes/advertisements-route')
const userRoute = require('./routes/user-route')

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use('/api/advertisements', advertisementsRoute)
app.use('/api/signin', userRoute)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});
