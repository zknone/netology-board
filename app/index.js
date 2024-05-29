const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

const advertisementsRoute = require('./routes/advertisements-route')
const signinRoute = require('./routes/signin-route')
const signupRoute = require('./routes/signup-route');
const UserModel = require('./models/usermodel');

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'static')))

const PORT = process.env.PORT || 3000
const UrlDB = process.env.URL_DB

app.use('/api/advertisements', advertisementsRoute)
app.use('/api/signin', signinRoute)
app.use('/api/signup', signupRoute)


async function start(PORT, urlDb) {
  try {
    await mongoose.connect(urlDb, { dbName: 'ads' });


    const users = await UserModel.find().select('-__v');
    console.log(users);

    app.listen(PORT, async () => {
      console.log('Server is running on port', PORT)
    })
  } catch (error) {

  }
}


start(PORT, UrlDB);