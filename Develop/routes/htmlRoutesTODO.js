// require path and express
// create a variable called router and set it to express.router() 
const path= require('path');
const router = require('express').Router();


// create a get route on router
// path should be '/notes'
// send the notes.html file from the public folder
// HINT: use path.join and __dirname
router.get('/notes',(req,res)=>res.sendFile(path.join(__dirname,'../public/notes.html')));

// create a get route on router for all other routes
// path should be '*' (stands for all or any)
// send the index.html file from the public folder
// HINT: use path.join and __dirname
router.get('/*',(req,res)=>res.sendFile(path.join(__dirname,'../public/index.html')));
// export the router

module.exports=router;