
const express = require('express');
const app = express();
const { Sequelize} = require("sequelize");


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqliteData/database.sqlite",
});

const ToDo = sequelize.define("todo", {
        id:{
           type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        title:{
            type: Sequelize.STRING,
            defaultValue: "Title",
        },
        description:{
            type: Sequelize.STRING,
            defaultValue: "",
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
});

sequelize.sync().then(()=>{
    app.listen(3000, function(){
        console.log("Сервер запущен на 3000 порту");
    });
}).catch(err=>console.log(err));

app.get('/api/todos', (req, res) => {
    ToDo.findAll({raw: true }).then(notes => res.json(notes));
});
app.get('/api/todos/:id', (req, res) => {
    ToDo.findAll({ where: { id: req.params.id }}).then(notes => res.json(notes));
});

app.post('/api/todos', (req, res) => {
    const newtitle = String(req.query.title);
    const newdescription = String(req.query.description);
    const newisDone = Boolean(req.query.isDone);
    ToDo.create({title: newtitle, description: newdescription, isDone: newisDone}).then(function(note) {
        res.json(note);
    });
});

app.patch('/api/todos/:id', function(req, res) {
    ToDo.findByPk(req.params.id).then(function(todo) {
        todo.update({
            title: req.query.title,
            description: req.query.description,
            isDone: req.query.isDone
        }).then((note) => {
            res.json(note);
        });
    });
});

app.delete('/api/todos/:id', function(req, res) {
    ToDo.findByPk(req.params.id).then(function(todo) {
        todo.destroy();
    }).then((note) => {
        res.sendStatus(200);
    });
});
app.delete('/api/todos', function(req, res) {
    ToDo.destroy({
        where: {},
        truncate: true
    }).then((todo) => {
        res.sendStatus(200);
    });
});



