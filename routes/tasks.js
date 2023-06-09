const express = require('express');
const router = express.Router();
const  {
    getAllTask, 
    getSingleTask, 
    createTask, 
    updateTask, 
    editTask, 
    deleteTask
} = require('../controllers/Tasks');

router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getSingleTask).patch(updateTask).put(editTask).delete(deleteTask);

module.exports = router;