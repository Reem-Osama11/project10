// const express = require('express')

// const app = express()

// const port = process.env.port ||3000


// require('./db/mongoose')


// app.use(express.json())

// const UserRouter = require('./routers/user')

// app.use(UserRouter)
// ////////////////////////////////////////////////

// // const bcryptjs=require("bcryptjs")
// // const passwordfunc=async()=>{
// //     const password="123456789"
// //     const  hashedpassword=await bcryptjs.hash(password,8)

// //     console.log(password)
// //     console.log(hashedpassword)

// //     const compare=await bcryptjs.compare(password,hashedpassword)
// //     console.log(compare)

// // }
// // passwordfunc()


// ////////////////////////////////////////////////////////////////////////////////////////

// // const jwt=require('jsonwebtoken')

// // const myToken=()=>{

// //     const token =jwt.sign({_id:"147258369"},"medo123")
    
// //     console.log(token)

// //     const tokenVerify=jwt.verify(token,"medo123")

// //     console.log(tokenVerify)

// // }
// // myToken()

// ///////////////////////////////////////////////

// app.listen(port ,() => {console.log('All Done Successfully')})


///////////////////////////////////////////////////////////////////////////////////////////////////////
const express=require('express')

const app=express()

const port=process.env.PORT || 3000

require ('./db/mongoose')

app.use(express.json())



const userRouter = require("./routers/user")
const taskRouter = require('./routers/task')
const Task = require('./models/task')
app.use(userRouter)
app.use(taskRouter)

////////////////////////////////////////////////////////////////////////////

// const relationfunc=async()=>{
//     const task=await Task .findById('661942afc19762b243e52c9e')
//     await task.populate('owner')
//     console.log(task)
//     console.log(task.owner)

// }
// relationfunc()
////////////////////////////////////////////////////////////////////////////
app.listen(port,()=>{
    console.log("All Done")
})