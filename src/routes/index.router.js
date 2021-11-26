const router = require('express').Router();
const axios = require('axios');

router.route('/')
  .get(async (req, res) => {
    res.render('index');
  })
  .post(async (req, res) => {
    try {
      const { city } = req.body;
      const apiKey = '431a0c3fad1fd89908511d26471427e0';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${apiKey}`;
      const ans = await axios(url);
      const temp = ans.data.main.temp;
      const wet = ans.data.main.humidity;
      const wind = ans.data.wind.speed;
      let weather = '';

      if (temp > 16 & temp < 22) weather = 'Warmly!';
      else if (temp > 0 & temp <= 16) weather = 'Сold!';
      else if (temp < 0) weather = 'Too Cold!';
      else weather = 'HEAT!';

      let mes = { city, temp, wet, wind, weather };
      res.json(mes);
    } catch (err) {
      console.log('nope');
    }
  });

module.exports = router;
