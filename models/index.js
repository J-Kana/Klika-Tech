const {Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`postgres://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.DATABASE_DB}`);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.music = require("./music.model.js")(sequelize, DataTypes);

module.exports = db;