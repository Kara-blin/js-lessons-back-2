const {Sequelize, Model} = require("sequelize");
const sequelize = require("./dbconfig");

class ToDo extends Sequelize.Model {}
ToDo.init(
    {
        id:{
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        title:{
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Title",
        },
        description:{
            type: Sequelize.DataTypes.STRING,
            defaultValue: "",
        },
        isCompleted: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {sequelize, underscored: true, modelName: "todo"}
);

module.exports = ToDo;