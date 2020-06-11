const express=require('express');
const router=express.Router();
const {Movie,validate}=require('../models/movie');
const {Genre}=require('../models/genre')
const auth=require('../middleware/auth')

router.route('/')
    .get((req,res)=>{
        Movie.find({},(err,foundMovies)=>{
            if(!foundMovies) return res.status(404);
            res.send(foundMovies);
        })
    })
    .post(auth,(req,res)=>{
        const inputTitle=req.body.title;
        const stockNumber=req.body.numberInStock;
        const inputGenreId=req.body.genreId;
        const rentalRate=req.body.dailyRentalRate;

        const {error}=validate(req.body);
        if (error) return res.status(400), error;

        Genre.findById(inputGenreId,(err,genre)=>{
            if(!genre) return res.status(404).send('invalid genre');

            // res.send(genre);
            const movie=new Movie({
                title:inputTitle,
                genre: {
                    _id:genre._id,
                    genre:genre.genre
                },
                numberInStock:stockNumber,
                dailyRentalRate:rentalRate
            });
            movie.save(err=>{
                if (err) return res.send(err)
                res.send(movie)
            })
        })


    })
    .delete(auth,(req,res)=>{
        Movie.delete({},err=>{
            if (err) return res.send(err)
            res.send('Deleted!')
        })
    });
router.route('/:id')
    .get((req,res)=>{
        const movieId=req.params.id;
        Movie.findOne({_id:movieId},(err,foundMovie)=>{
            if (!foundMovie) return res.status(404);
            res.send(foundMovie);
        })

    })
    .put(auth,(req,res)=>{
        const movieId=req.params.id;
        const inputTitle=req.body.title;
        const inputGenre=req.body.genre;
        const stockNumber=req.body.numberInStock;
        const rentalRate=req.body.dailyRentalRate;

        const { error} = validate(req.body)
        if(error) return res.status(400)

        Movie.findByIdAndUpdate(movieId,{title:inputTitle,genre:inputGenre,numberInStock:stockNumber,dailyRentalRate:rentalRate},{new:true},(err,foundMovie)=>{
            if (err) return res.send(err)
            res.send(foundMovie)
        })

    })
    .delete(auth,(req,res)=>{
        const movieId=req.params.id;
        Movie.findByIdAndRemove(movieId,null,(err,foundMovie)=>{
            if (!foundMovie) return res.status(404)
            res.send(foundMovie)
        })
    });

module.exports=router;