const jwt=require('jsonwebtoken');
const express=require('express');
const _ =require('lodash');
require('dotenv').config()
const bcrypt=require('bcrypt');
const router=express.Router();
const {User,validate}=require('../models/user');
const saltRounds=10;

router.route('/')
    .get((req,res)=>{
        User.find({},(err,users)=>{
            if (err) return res.send(err)
            res.send(users);
        })
    })
    .post((req,res)=>{
        const inputName=req.body.name;
        const inputEmail=req.body.email;
        const inputPassword=req.body.password;

        const {error}=validate(req.body);
        if(error) return res.status(400) ,error;

        User.findOne({email:inputEmail},(err,user)=>{
            if (err) return res.send(err)
            if(user) return res.status(400).send('User already registered');

            bcrypt.hash(inputPassword,saltRounds,(err,hash)=>{
                user=new User({
                    name:inputName,
                    email:inputEmail,
                    password:hash
                });
                user.save(err=>{
                    if (err) return res.send(err)

                    jwt.sign({_id: user._id},process.env.SECRET, (err, token) => {
                        // res.send(token);
                        res.header('x-auth-token',token).send(_.pick(user, ['id','name', 'email']));
                    });


                })
            })

        })
    });


module.exports=router;