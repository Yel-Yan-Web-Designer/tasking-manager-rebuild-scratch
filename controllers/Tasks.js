const User = require('../models/model');

const getAllTask = async (req, res) => {
    try {
        const task = await User.find({});
        return res.status(200).json({ task })
    } catch (error) {
        return res.status(500).json({msg : "Internal server error"})
    }
}
const getSingleTask = async (req, res) => {
    try {
        const {id : taskID } = req.params;
        const task = await User.findOne({_id : taskID});
        res.status(200).json({ task });
    } catch (error) {
        return  res.status(500).json({msg : "Internal server error"})
    }
}
const createTask = async (req, res) => {
    try {
        const task = await User.create(req.body);
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg : "Internal server error"})
    }
}
const updateTask = async (req, res) => {
    try {
        const { id : taskID} = req.params;
        const task = await User.findOneAndUpdate(
            { _id : taskID}, 
            {name : req.body.name , completed : req.body.completed}, 
            {new : true, runValidators : true}
        );

        if(!task){
            return res.status(404).json({
                msg : `No task with id ${taskID}`
            })
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg : "Internal server error"})
    }
}
const editTask = (req, res) => {
    res.status(200).send("edit task")
}
const deleteTask = async  (req, res) => {
    try {
        const { id : taskID } = req.params;
        const task = await User.findOneAndDelete({ _id : taskID});
        
        if(!task){
            return res.status(404).json({
                msg : `No task with id ${taskID}`
            })
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({ msg : "Internal server error"})
    }
}

module.exports = {
    getAllTask, 
    getSingleTask, 
    createTask, 
    updateTask, 
    editTask, 
    deleteTask
}