const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const UserModel = require('./models/user-model');
const UserModule = require('./modules/users');

const Chat = require('./modules/chat');

const advertisementsRoute = require('./routes/advertisements-route');
const signinRoute = require('./routes/signin-route');
const signupRoute = require('./routes/signup-route');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const options = {
  usernameField: 'email',
  passwordField: 'password',
};

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;
const UrlDB = process.env.URL_DB;

app.use('/api/advertisements', advertisementsRoute);
app.use('/api/signin', signinRoute);
app.use('/api/signup', signupRoute);

async function start(PORT, urlDb) {
  try {
    await mongoose
      .connect(UrlDB, {
        dbName: 'ads',
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB', err);
      });

    const verify = async (email, password, done) => {
      const user = await UserModule.findByEmail(email);

      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        return done(null, false, { message: 'wrong password' });
      }

      return done(null, user);
    };

    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
      const user = await UserModel.findById(id).select('-__v');
      if (!user) {
        return cb(new Error('User not found'));
      }
      cb(null, user);
    });

    passport.use(new LocalStrategy(options, verify));

    server.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  } catch (error) {
    console.log('error', error);
  }
}

start(PORT, UrlDB);

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);
  const { roomId } = socket.handshake.query;
  console.log('room ID:', roomId);

  socket.join(roomId);

  socket.on('private-message', async (message) => {
    await Chat.sendMessage(socket, message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected:', socket.id);
  });
});
