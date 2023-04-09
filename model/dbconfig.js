const {Sequelize} = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqliteData/database.sqlite",
});
module.exports = sequelize;