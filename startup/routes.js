const express=require('express');
const bodyParser=require('body-parser');
const genres=require('../routes/genres');
const customers=require('../routes/customers');
const movies=require('../routes/movies');
const registration=require('../routes/users');
const auth=require('../routes/auth');
const error=require('../middleware/error');

module.exports=app=>{
    app.use(bodyParser.urlencoded({extended:true}))
    app.use('/api/genres',genres);
    app.use('/api/customers',customers);
    app.use('/api/movies',movies);
    app.use('/api/users',registration);
    app.use('/api/auth',auth);
    app.use(error);
}