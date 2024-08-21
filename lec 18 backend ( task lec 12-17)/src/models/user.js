
// const mongoose = require('mongoose')


// const validator = require('validator')

// const bcryptjs = require ('bcryptjs')


// const jwt=require('jsonwebtoken')

// const UserSchema=new mongoose.Schema({
    
//     username: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 8,
//         validate(value){
//             let password=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
//             if(!password.test(value)){
//                 throw new Error ("Password must include uppercase , lowercase , numbers , speacial characters")
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         lowercase: true,
//         unique: true,
//         validate(val) {
//             if (!validator.isEmail(val)) {
//                 throw new Error("Invalid Email Address")
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 18,
//         validate(val) {
//             if (val <= 0) {
//                 throw new Error("age must be a positive number")
//             }
//         }
//     },
//     city: {
//         type: String
//     },
//     tokens:[
//         {
//             type: String,
//             required : true
//         }
//     ]

// })

// UserSchema.pre("save",async function(){
//     const user=this //this==>document
//     console.log(user)

//     // user.password = await  bcryptjs.hash (user.password , 8)
//     if (user.isModified('password')) {
//         user.password = await bcryptjs.hash(user.password, 10)
//     }
// })

// //////////////////////////////////////////////////////////////////////////////////////////////////


// UserSchema.statics.findByCredentials = async (em,pass) =>{

//     const user = await User.findOne({email:em})
//     if(!user){
//         throw new Error('Unable to login')
//     }

//     const isMatch = await bcryptjs.compare(pass,user.password)

//     if(!isMatch){
//         throw new Error('Unable to login')
//     }
//     return user
// }

// //////////////////////////////////////////////////////////////////////////////
// UserSchema.methods.generateToken = async function () {

//     const user = this 

//     const token = jwt.sign ({_id:user._id.toString() } , "islam500")
//     // user.tokens = user.tokens

//     user.tokens = user.tokens.concat(token)
//     await user.save()

//     return token
// }
// //////////////////////////////////////////////////////////////////////////////

// UserSchema.methods.toJSON=function () {

//     const user=this

//     const userObject=user.toObject()

//     delete userObject.password
//     delete userObject.tokens


//     return userObject
    
// }






// //////////////////////////////////////////////////////////////////////////////////////
// const User = mongoose.model('User', UserSchema)


// module.exports = User

/////////////////////////////////////////////////////////////////////////////////////////////////////////



const  mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
////////////////////////////////////////////////////////


const UserSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        validate(value){
            let password=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            if(!password.test(value)){
                throw new Error ("Password must include uppercase , lowercase , numbers , speacial characters")
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email Address")
            }
        }
    },
    age:{
        type:Number,
        default:18,
        validate(val){
            if(val<=0){
                throw new Error ("age must be a positive number")
            }
        }
    },
    tokens:[{
        type:String,
        required:true
    }]
})


/////////////////////////////////////
UserSchema.pre("save",async function () {
    const user=this

    if(user.isModified('password')){
    user.password=await bcryptjs.hash(user.password,10)
    }
})

//////////////////////////////////////

UserSchema.statics.findByCredentials=async(email,pas)=>{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error('Unable to login')
    }
   
    const isMatch = await bcryptjs.compare(pas,user.password)
  
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}
//////////////////////////////////////

UserSchema.methods.generateToken =async function () {
    const user=this
    const token=jwt.sign({_id:user._id.toString()},"medo")
    user.tokens=user.tokens.concat(token)
    await user.save()
    return token
}

//////////////////////////////////////
UserSchema.methods.toJSON=function (){
    const user=this
    const userObject=user.toObject()

    delete  userObject.password
    delete   userObject.tokens

    return  userObject
}
//////////////////////////////////////
UserSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:"owner"

})
//////////////////////////////////////

const User=mongoose.model('User',UserSchema)

module.exports=User;