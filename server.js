'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios')
const server = express();
const PORT = process.env.PORT;
// const weatherData = require('./data/weather.json');



server.listen(PORT, () => console.log("Server is ready!"));

server.use(cors());


server.get('/weather', async (req, res) => {

    let inputCityName = req.query.searchQuery;
    let inputLat = req.query.lat;
    let inputLon = req.query.lon;
    const weatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${inputLat}&lon=${inputLon}&key=${process.env.WEATHER_API_KEY}`;

    try {
        const axiosResult = await axios.get(weatherUrl);
        const weatherData = axiosResult.data.data;
        let filteredData = weatherData.map(item => new ForCast(item));
        res.status(200).send(filteredData);
    }  catch (error) {
        res.status(400).send('Data not found');
    }

});

server.get('/movie', async (request, response) => {

    const moviesCache = {};
    let cityName = request.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    
    if (moviesCache[cityName] !== undefined) {
        response.status(200).send(moviesCache[cityName]);
    } else {
            const moviesData = await axios.get(url);
            const arrayOfMoviesData = moviesData.data.results.map(item => {
                return new MovieApi(item);
            });
            moviesCache[cityName] = arrayOfMoviesData;
            response.status(200).send(arrayOfMoviesData);
    };
    

})


server.get('*', (req, res) => {
    res.status(500).send("Not found")
})


class ForCast {
    constructor(day) {

        this.date = day.datetime;
        this.description = day.weather.description;
    }
}
class MovieApi {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = movie.poster_path;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
    }
}