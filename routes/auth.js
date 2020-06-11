
const express=require('express');
const _ =require('lodash');
const bcrypt=require('bcrypt');
const router=express.Router();
const Joi=require('joi');
const auth=require('../middleware/auth')

const {User}=require('../models/user');

router.route('/')
    .get((req,res)=>{
        User.find({},(err,users)=>{
            if (err) return res.send(err)
            res.send(users);
        })
    })
    .post((req,res)=> {
        const inputEmail = req.body.email;
        const inputPassword = req.body.password;

        const {error} = validate(req.body);
        if (error) return res.status(400) , error;

        User.findOne({email: inputEmail}, (err, foundUser) => {
            if (err) return res.send(err)
            if (!foundUser) return res.send(400).send('Invalid email or password');

            bcrypt.compare(inputPassword, foundUser.password, (err, result) => {

                if (err) return res.send(400).send('Invalid email or password');
                if (result) {

                    const token=foundUser.generateAuthToken()
                        res.send(token);

                }
            });
        });
    })

const validate=req=>{
    const schema=Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(req);

}


module.exports=router;