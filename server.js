'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')
const server = express();
const PORT = process.env.PORT;
const main = require('./modules/main');
const weather = require('./modules/weather');
const movie = require('./modules/movie');
const weatherData = require('./data/weather.json');

//=======================================================( LISTENING )===================================================================

server.listen(PORT, () => console.log("Server is ready!"));

server.use(cors());

//=======================================================( END POINTS )==================================================================

server.get('/weather', weather.handleWeather);
server.get('/movie', movie.handleMovie);
server.get('*', main.handleMain);