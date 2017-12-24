var express = require('express');
var router = express.Router();
const request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Прогноз погоды в городе', weather: null, error: null });
});

router.post('/', function(req, res, next) {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${process.env.API_KEY}`;

  request(url, function(err, response, body){
    if(err){
      return res.render('error', {message: 'Error', error: err});
    }
    else{
      const weather = JSON.parse(body);
      if(weather.main === void 0){
        res.render('index', { title: 'Прогноз погоды в городе', weather: null, error: 'Произошла ошибка, город не найден' });
      }else{
        const weatherText = `Температура ${weather.main.temp} &#8451 в ${weather.name} А также ${weather.weather[0].description}`;
        res.render('index', { title: 'Прогноз погоды в городе', weather: weatherText, error: null });
      }
    }
  });
});

module.exports = router;
