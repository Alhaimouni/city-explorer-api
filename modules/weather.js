const axios = require('axios');

//====================================================( FUNCTIONS )=============================================================

async function handleWeather(req, res) {

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
}

//=====================================================( CLASSES )=============================================================

class ForCast {
    constructor(day) {

        this.date = day.datetime;
        this.description = day.weather.description;
    }
}

//=====================================================( EXPORTS )=============================================================

module.exports = {handleWeather};