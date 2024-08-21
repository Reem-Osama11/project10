// const express = require('express')
// const router = express.Router()
// const User = require('../models/user')


// router.post('/users' , (req, res) => {
//     console.log(req.body)
//     const user = new User(req.body)
//     user.save()
//         .then((user) => {
//             res.status(200).send(user)
//             // console.log(user);
//         })
//         .catch((e) => {
//             res.status(400).send(e)
//             // res.send(e)
//             // console.log(e);
//         })
// })
// //////////////////////////////////////////////////////////////////////
// router.get('/users' , (req, res) =>{
//     User.find({})
//     .then((user)=>{
//         res.status(200).send(user)
//     })
//     .catch((e) => {
//         res.status(400).send(e)
//     })
// })
// //////////////////////////////////////////////////////////////////////////
// router.get('/users/:id' , (req, res)=>{
//     console.log(req.params)
//     const _id= req.params.id;
//     User.findById( _id )
//     .then((user)=>{
//         if(!user){
//             res.status(404).send('Unable to find user')
//         }
//         res.status(404).send(user)
//     })
//     .catch((e)=>{
//         res.status(500).send(e)
//     })

// })
// ///////////////////////////////////////////////////////////////////////////



// router.patch('/users/:id' ,async(req, res)=>{
//     try{

        
//         const updates = Object.keys (req.body)
//         console.log(updates)


//         const _id= req.params.id;

//         // const user=await User.findByIdAndUpdate(_id,req.body,{
//         //     new:true,
//         //     runValidators:true
//         // })
//         const user = await User.findById (_id)

//         if(!user){
//             return res.status(404).send('No user is found')
//         }
//         updates.forEach((ele)=>{
//             user[ele]=req.body[ele]
//         })
//         await user.save()
        
//         res.status(200).send(user)
//     }
//     catch(error){
//         res.status(500).send(error)
//     }
// })



// //////////////////////////////////////////////////////////////////////////////
// router.delete('/users/:id' ,async(req, res)=>{
//     try{
//         const _id = req.params.id
//         const user = await User.findByIdAndDelete(_id)
//         if(!user){
//             return res.status(404).send('Unable to find user')
//         }
//         res.status(200).send(user)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

// ////////////////////////////////////////////////////////////////////////////////////////////

// // router.post("/login",async(req,res)=>{
// //     try{
// //         const user=await User.findByCredentials(req.body.email,req.body.password)
// //         res.status(200).send(user)
// //     }
// //     catch(e){
// //         res.status(400).send(e.message)
// //     }
// // })
// /////////////////////////
// router.post('/login',async(req,res)=>{
//     try{
//         const user = await User.findByCredentials(req.body.email,req.body.password)

//         const token = await user.generateToken()

//         res.status(200).send({ user , token})
//     }
//     catch(e){

//         res.status(400).send(e.message)
        
//     }
// })

// ///////////////////////////////////////////////////////////////////////////////////
// router.post ('/users' , async (req , res) => {
//     try {
//         const user = new User (req.body)

//         const token = await user.generateToken()

//         await user.save()
        
//         res.status(200).send({user , token})

//     } 
//     catch (e) {
//         res.status(400).send(e)
//     }
// })

// ////////////////////////////////////////////////////////////////////////////////////////

// module.exports = router


///////////////////////////////////////////////////////////////////////////////////////////////////////


const express=require('express')

const User = require('../models/user')

const router=express.Router()


const auth = require('../middleware/auth')

////////////////////////////////////////////////

router.post('/users',(req,res)=>{

    const user=new User (req.body)
    user.password
    user.save()

    .then((user)=>{
        res.status(200).send(user)

    })
    .catch((e)=>{

        res.status(400).send(e)

    })

})

////////////////////////////////////////////////////////////

router.get('/users',auth,(req,res)=>{
    User.find({})
    .then((user)=>{
        res.status(200).send(user)
    })
    .catch((e)=>{
        res.status(500).send(e)
    })

})
/////////////////////////////////////////////////////////////
router.get('/users/:id',auth,(req,res)=>{
    const _id=req.params.id
    User.findById(_id)
    .then((user)=>{
        if(!user){
            res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)

    })
    .catch((e)=>{
        res.status(500).send(e)
    })

})
///////////////////////////////////////////////////////////////
// router.patch('/users/:id',async(req,res)=>{
//     try{
//         const _id=req.params.id
//         const user=await User.findByIdAndUpdate(_id,req.body,{
//             new:true,
//             runValidators:true,
//         })
//         if(!user){
//             res.status(404).send('Unable to find user')
//         }
//         res.status(200).send(user)
//     }

//     catch(error){
//         res.status(500).send(error)
//     }

// })
////////////////////////////////////////////////////////////
router.patch('/users/:id',auth, async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        const updates = Object.keys(req.body)
        updates.forEach((ele)=>{
            user[ele]=req.body[ele]
        })
        await user.save()

        if (!user) {
            res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }

})

///////////////////////////////////////////////////////////
router.delete('/users/:id',auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const user =await User.findByIdAndDelete(_id)

        if(!user){
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    }
    catch(error){
        res.status(500).send(error)
    }
})

///////////////////////////////////////////////////////////
// router.post('/login',async(req,res)=>{
//     try{
//         const user = await User.findByCredentials(req.body.email,req.body.password)
        
//         res.status(200).send({user})
//     }
//     catch(e){
//         res.status(400).send(e.message)
//     }
// })
/////////////////////////////////////////////////////////
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token =await user.generateToken()
        res.status(200).send({user,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
///////////////////////////////////////////////////////////
router.post('/users',async(req,res)=>{
    try{

        const user=new User(req.body);
        const token =await user.generateToken()
        await user.save()
        res.status(200).send({user,token})

    }
    catch(e){

        res.status(400).send(e.message)

    }
})
///////////////////////////////////////////////////////////
router.get('/profile',auth,async(req,res)=>{
    res.status(200).send(req.user)

})
///////////////////////////////////////////////////////////
router.delete('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((ele)=>{
            return ele !==req.token
        })
        await req.user.save()
        res.send()

    }
    catch(e){

        res.status(500).send(e)

    }
})
///////////////////////////////////////////////////////////
router.delete('/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()

    }
    catch(e){

        res.status(500).send(e)

    }
})
/////////////////////////////////////////////////////////////////////
module.exports=router