require('custom-env').env();        // Файл со всеми данными сервера и бд
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

const template = (status, message, data, autch, res) => {
  res.status(status).json({
      status: status,
      message: message,
      data: data,
      autch: autch
  });
};

app.use(bodyParser.json({ limit: '50kb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50kb' }))

const db = require('./models');

/** @description Строка для синхронизации изменении с БД */
db.sequelize.sync();

/** @description Строки для полного изменения БД, сохраняя при этом уже существующие данные */
// db.sequelize.sync({ alter: true }).then(() => {       // alter: true,     force: false
//    console.log('Altered and Re-synced Database');
// });

require('./routes/music.route')(app);

app.use((req, res) => { template(404, "Route '" + req.url + "' not found!", [], false, res); })

app.listen(process.env.HOST_PORT, () => {
    console.log("Localhost server started on port " + process.env.HOST_PORT + "!", Date())
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend-klika/build')));


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend-klika/build', 'index.html'));
});