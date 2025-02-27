const express = require('express')
const Task = require('../models/task')
const auth = require ("../middleware/auth")
const router = express.Router()


router.post('/tasks',auth,async(req,res)=>{
    try{
        // owner : req.user._id    عايزك تعرض owner =>تجيب id =>user
        const task = new Task({...req.body , owner : req.user._id })
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e.message)
    }

})

router.get('/tasks',auth,async(req,res)=>{
    try{
        // const tasks = await Task.find({})
        // res.status(200).send(tasks)
        await req.user.populate('tasks')
        res.status(200).send(req.user.tasks)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.get('/tasks/:id',auth,async(req,res)=>{
    try{
        // const task = await Task.findById(req.params.id)
        const id = req.params.id
        const task = await Task.findOne({_id:id , owner : req.user._id})
        if(!task){
          return  res.status(404).send('يسطا التاسك دا مش بتاعك ')
        }
        await task.populate('owner')

        res.send(task)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.patch('/task/:id',auth,async(req,res)=>{
    try{
        const _id = req.params.id
        const task = await Task.findOneAndUpdate({_id , owner : req.user._id},{
            new:true,
            runValidators:true
        })
        if(!task){
            return res.status(404).send('No task')
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

router.delete('/task/:id',auth,async(req,res)=>{
    try{
        // const task = await Task.findByIdAndDelete(req.params.id)
        const _id = req.params.id
        const task = await Task.findOneAndDelete({_id , owner : req.user._id})
        if(!task){
            res.status(404).send('No task is found')
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

module.exports = router 