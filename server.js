'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
const PORT = process.env.PORT;
const weatherData = require('./data/weather.json');


server.listen(PORT,()=>console.log("Server is ready!"));


server.get('/weather',(req,res)=> {

    let inputCityName = req.query.searchQuery;
    let inputLat = req.query.lat;
    let inputLon = req.query.lon;

        
    if(!inputCityName) {
        res.status(400).send('Please follow the documentation and fill the requierd feild as the following ?searchQuery=city name');
    }

    let result = weatherData.find(item=>inputCityName.toLowerCase() === item.city_name.toLowerCase());
   
    
    try {
        let filteredData = result.data.map(item=> new ForCast(item));
        res.status(200).send(filteredData);
    }catch (error) {
        res.status(400).send('Data not found');
    }

});


class ForCast {
    constructor(day) {

        this.date = day.valid_date;
        this.description = day.weather.description ;
    }
}

