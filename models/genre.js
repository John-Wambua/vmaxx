const mongoose=require('mongoose');
const Joi = require ('joi');

const genreSchema=mongoose.Schema({
    genre:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});
const Genre=mongoose.model('Genre',genreSchema);


const validateInput=genre=>{
    const schema=Joi.object({
        genre: Joi.string().min(2).required(),
    });

    return schema.validate(genre);

}
exports.Genre=Genre;
exports.genreSchema=genreSchema;
exports.validate=validateInput;
