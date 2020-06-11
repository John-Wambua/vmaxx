const mongoose=require('mongoose');
const winston=require('winston')
require('winston-mongodb');
const express=require('express');
const bodyParser=require('body-parser');
const genres=require('./routes/genres');
const customers=require('./routes/customers');
const movies=require('./routes/movies');
const registration=require('./routes/users');
const auth=require('./routes/auth');
const error=require('./middleware/error');
const app=express();

// process.on('uncaughtException',ex=>{
//     console.log('WE GOT AN UNCAUGHT EXCEPTION');
//     winston.error(ex.message,ex);
// })
winston.handleExceptions(
    new winston.transports.File({filename:'uncaughtExceptions.log'})
);

mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/users',registration);
app.use('/api/auth',auth);
app.use(error);

winston.add(new winston.transports.File({filename:'logfile.log'}))
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly',poolSize: 2, autoReconnect: true, useNewUrlParser: true,useUnifiedTopology:true}));


const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)

})