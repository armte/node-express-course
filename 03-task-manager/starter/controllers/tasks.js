const Task = require('../models/Tasks');
const asyncWrapper = require('../middleware/async')
const {createCustomError, CustomAPIError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ tasks: tasks, amount: tasks.length})
  } catch (err) {
    res.status(500).json({ msg: err})
  }
});

const createTask = asyncWrapper(async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });  
  } catch (err) {
    res.status(500).json({ msg: err})
  }
});

const getTask = asyncWrapper(async (req, res, next) => {
  try {
    const {id:taskID} = req.params
    const task = await Task.findOne({_id: taskID})
    if (!task) {
      return next(createCustomError(`No task with ID: ${taskID}`, 404));
      return res.status(404).json({ msg: `No task with ID: ${taskID}`})
    }
    res.status(200).json({task})
  } catch (err) {
    res.status(500).json({ msg: err})
  }
});

const deleteTask = async (req, res) => {
  try {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id: taskID})
    if (!task) {
      return res.status(404).json({ msg: `No task with ID: ${taskID}`})
    }
    res.status(200).json({task})
  } catch (err) {
    res.status(500).json({ msg: err})
  }
}

const updateTask = async (req, res) => {
  try {
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ msg: `No task with ID: ${taskID}`})
    }
    res.status(200).json({task})
  } catch (err) {
    res.status(500).json({ msg: err})
  }
}

const editTask = async (req, res) => {
  try {
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    })
    if (!task) {
      return res.status(404).json({ msg: `No task with ID: ${taskID}`})
    }
    res.status(200).json({task})
  } catch (err) {
    res.status(500).json({ msg: err})
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask
}