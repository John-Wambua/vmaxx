const jwt=require('jsonwebtoken');
const express=require('express');
const _ =require('lodash');
require('dotenv').config()
const bcrypt=require('bcrypt');
const router=express.Router();
const {User,validate}=require('../models/user');
const saltRounds=10;
const auth=require('../middleware/auth')

router.route('/me')
    .get(auth,(req,res)=>{
        const userId=req.user._id
        User.findById(userId, {password:0},(err,users)=>{
            if (err) return res.send(err)
            res.send(users);
        })
    });
router.route('/')
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

                    const token=user.generateAuthToken();
                        // res.send(token);
                        res.header('x-auth-token',token).send(_.pick(user, ['id','name', 'email']));


                })
            })

        })
    });
router.route


module.exports=router;