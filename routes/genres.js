const express=require('express');
const router=express.Router();
const {Genre,validate}=require('../models/genre')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')


router.route('/',)
    .get((req,res,next)=>{

        Genre.find({},(err,foundGenres)=>{
            if (err) return next(err)
            if(!foundGenres) return res.status(404),res.send("No records found")
            res.send(foundGenres)
        })
    })
    .post(auth,(req,res)=>{
        const inputGenre=req.body.genre;

        const { error} = validate(req.body)

        if(error) return res.status(400)
        const genre=new Genre({
            genre:inputGenre
        })

        genre.save(err=>{
            if (err) return console.log(err)
            res.send(genre);
        });

    });
router.route('/:id')
    .get((req,res)=>{
        const genreId=req.params.id;
        Genre.findOne({_id:genreId},(err,foundGenre)=>{
            if (!foundGenre) return res.status(404);
            res.send(foundGenre);
        })

    })
    .put(auth,(req,res)=>{
        const genreId=req.params.id;
        const inputGenre=req.body.genre;

        const { error} = validate(req.body)
        if(error) return res.status(400)

        Genre.findByIdAndUpdate(genreId,{genre:inputGenre},{new:true},(err,foundGenre)=>{
            if (err) return res.send(err)
            res.send(foundGenre)
        })

    })
    .delete([auth,admin],(req,res)=>{
        const genreId=req.params.id;
       Genre.findByIdAndRemove(genreId,null,(err,foundGenre)=>{
           if (!foundGenre) return res.status(404)
           res.send(foundGenre)
       })
    });

module.exports=router;