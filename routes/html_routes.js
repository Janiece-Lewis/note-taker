// file to define routes

const path = require('path');
const router = require('express').Router();

// middleware
router.get('/notes',(req,res)=>{
res.sendFile(path.join(__dirname,'../public/notes.html'))
});

router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
    });

module.exports = router;