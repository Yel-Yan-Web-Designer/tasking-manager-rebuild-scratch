const express = require('express');
const app = express ();
const connectDb = require ('./database/connect');
require('dotenv').config();
const tasks = require('./routes/tasks');

app.use(express.static('./public'))

// middleware
app.use(express.json()); // parse json string into json 

// routes
app.use('/api/v2/tasks', tasks);
// middleware error


const port = process.env.PORT || 7000;

const start = () => {
    try {
        connectDb(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server listens at port ${port}`))
        console.log("connected to database");
    } catch (error) {
        console.log(error);
    }
}
start();

// get all tasks --> /api/v2/tasks
// get single task --> /api/v2/tasks/:id
// create single task --> /api/v2/tasks/:id
// update(patch) single task --> /api/v2/tasks/:id
// delete single task --> /api/v2/tasks/:id