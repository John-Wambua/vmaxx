const mongoose=require('mongoose');
const Joi=require('joi');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 50
    },
    email:{
      type:String,
        required: true,
      unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        minlength:6,
        required:true,
    }
});

const User=mongoose.model('User',userSchema);

const validateInput=user=>{
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(user);

}
module.exports.User=User;
module.exports.validate=validateInput;