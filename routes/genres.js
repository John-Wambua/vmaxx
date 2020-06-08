const express=require('express');
const router=express.Router();
const {Genre,validate}=require('../models/genre')


router.route('/')
    .get((req,res)=>{

        Genre.find({},(err,foundGenres)=>{
            if(!foundGenres) return res.status(404),res.send(err)
            res.send(foundGenres)
        })
    })
    .post((req,res)=>{
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
    .put((req,res)=>{
        const genreId=req.params.id;
        const inputGenre=req.body.genre;

        const { error} = validate(req.body)
        if(error) return res.status(400)

        Genre.findByIdAndUpdate(genreId,{genre:inputGenre},{new:true},(err,foundGenre)=>{
            if (err) return res.send(err)
            res.send(foundGenre)
        })

    })
    .delete((req,res)=>{
        const genreId=req.params.id;
       Genre.findByIdAndRemove(genreId,null,(err,foundGenre)=>{
           if (!foundGenre) return res.status(404)
           res.send(foundGenre)
       })
    });

module.exports=router;