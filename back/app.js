const express = require('express');
const mongoose = require('mongoose');
const helmet = require("helmet");
const path = require('path');
const cors = require('cors');
const rateLimit= require('./middleware/rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x9mo6th.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(cors());
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(mongoSanitize());
  app.use(rateLimit.limiter)
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces', sauceRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
module.exports = app;