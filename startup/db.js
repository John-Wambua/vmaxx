const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser:true,useUnifiedTopology:true});
}