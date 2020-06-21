const winston=require('winston')
require('winston-mongodb');

module.exports=()=>{
    winston.handleExceptions(
        new winston.transports.File({filename:'uncaughtExceptions.log'}),
        new winston.transports.Console({colorize:true,prettyPrint:true})
    );

    winston.add(new winston.transports.File({filename:'logfile.log'}))
    winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly',poolSize: 2, autoReconnect: true, useNewUrlParser: true,useUnifiedTopology:true}));

}