const express=require('express');
const router=express.Router();
const {Customer,validate}=require('../models/customer')

router.route('/')
    .get((req,res)=>{

        Customer.find({},(err, foundGenres)=>{
            if(err) return err;
            res.send(foundGenres)
        })
    })
    .post((req,res)=>{
        const isGold=req.body.isGold;
        const inputName=req.body.name;
        const inputPhone=req.body.phone;

        const { error} = validate(req.body)
        if(error) return res.status(400),res.send(error)
        const customer=new Customer({
            isGold:isGold,
            name:inputName,
            phone:inputPhone
        })
        customer.save(err=>{
            if (err) return console.log(err)
            res.send(customer);
        });
    });
router.route('/:id')
    .get((req,res)=>{
        const customerId=req.params.id;
        Customer.findOne({_id:customerId},(err, foundCustomer)=>{
            if (!foundCustomer) return res.status(404);
            res.send(foundCustomer);
        })

    })
    .put((req,res)=>{
        const customerId=req.params.id;
        const isGold=req.body.isGold;
        const inputName=req.body.name;
        const inputPhone=req.body.phone;
        const { error} = validate(req.body)
        if(error) return res.status(400)
        Customer.findByIdAndUpdate(customerId,{isGold:isGold,name:inputName,phone:inputPhone},{useFindAndModify:false,new:true},(err, foundCustomer)=>{
            if (err) return res.send(err)
            res.send(foundCustomer)
        })
    })
    .delete((req,res)=>{
        const customerId=req.params.id;
        Customer.findByIdAndRemove(customerId, {useFindAndModify:false},(err, foundCustomer)=>{
            if (!foundCustomer) return res.status(404)
            res.send(foundCustomer)
        })
    });
module.exports=router;