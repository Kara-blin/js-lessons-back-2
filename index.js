
const sequelize = require("./model/dbconfig")
const ToDo = require("./model/ToDo.model");
const express = require('express');
const app = express();
app.use(express.json());




initBD = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Sequelize was instaled");
    } catch (error){
        console.log("Sequelize ERROR",error);
        process.exit();
    }
};

initBD().then(r => app.listen(3100, () => {
    console.log('Application listening on port 3100!');
}));

app.get('/api/todos', async (req, res) => {
    const todos = await ToDo.findAll();
    res.send({todos});
});
app.get('/api/todos/:id', (req, res) => {
    ToDo.findByPk(req.params.id).then(todo => res.json({todo}));
});

app.post('/api/todos', async (req, res) => {
    const newtodo = {
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted
    };
    await ToDo.create(newtodo).then(function (todo) {
        res.json({todo});
    });
});

app.patch('/api/todos/:id', function(req, res) {
    const updatetodo = req.body;

    ToDo.findByPk(req.params.id).then(todo => {
        if (todo !=null) {
            todo.update({
                title: updatetodo.title,
                description: updatetodo.description,
                isCompleted: updatetodo.isCompleted
            }).then((todo) => {
                res.json({todo});
            });
        }
        else {
            res.json({"Todo was null":""});
        }
    });
});

app.delete('/api/todos/:id', function(req, res) {
    ToDo.findByPk(req.params.id).then(todo=> {
        if (todo != null){
                todo.destroy().then((todo) => {
                res.json({"Todo was deleted":""});
            });
        }else{
            res.json({"Todo was null":""});
        }
    })
});
app.delete('/api/todos', function(req, res) {
    ToDo.destroy({
        where: {},
        truncate: true
    }).then((todo) => {
        res.json({"Todo was deleted":""});
    });
});
module.exports = {sequelize, initBD};