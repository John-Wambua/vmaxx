const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies=require('./routes/movies');
const registration=require('./routes/users');
const auth=require('./routes/auth');
const app=express();

mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/users',registration);
app.use('/api/auth',auth);


const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)

})