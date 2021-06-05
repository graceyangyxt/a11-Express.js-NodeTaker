// require fs, path, require('uuid/v1'), and express
// create a variable called router and set it to express.router()
const fs =  require('fs');
const path = require('path');
const uuid = require('uuid');
const router= require('express').Router();
// create a variable called dbPath and set it to the path to the db.json file.
// HINT: this is done using the path.join method, __dirname, 
//and the realtive path from this file to the db.json file
const dbPath = require('../db/db.json');

// create a get route using the router
// the endpoint should be '/notes'
// in the callback function
	// use the fs.readFile method to read the db.json file
	// if there is an error respond with a 500 status (res.status) and the error as json (res.json)
	// otherwise, parse the json returned and send it using the res.json method
// router.get('api/notes',(req,res)=> fs.readFile(dbPath,(err,data)=>{
// 	console.log(data)
// 	res.send(data)
// }))
router.get('/notes',(req,res)=>{
	// res.send(dbPath)
	fs.readFile('./db/db.json',(err,data)=>{
		if(err) throw err;
		res.writeHead(200,{'Content-Type' : 'text/json'})
		res.write(data);
		res.end();
	})
})


// create a post route using the router
// the endpoint should be '/notes'
// in the callback function
	// use the fs.readFile method to read the db.json file
		// if there is an error respond with a 500 status (res.status) and the error as json (res.json)
		// otherwise, parse the json returned
		// use the req.body and the uuvid1() to create a new object with the values sent in the req and a unique id
		// add the new note you just created to the notes returned from readFile and stringify it to json
		// use the fs.writeFile method to write to the db.json file using the updated, stringified notes
			// if there is an error respond with a 500 status (res.status) and the error as json (res.json)
			// otherwise, return the new note you created using res.json

router.post('/notes',(req,res)=>{
	fs.readFile('./db/db.json', (err,data)=>{
		if(err) res.status(500).json(err);
		const notes=JSON.parse(data);
		const newNote= req.body;
		newNote.id = uuid.v1();
		
		notes.push(newNote);
		console.log(notes);
		fs.writeFile('./db/db.json',JSON.stringify(notes),err=>{
			if(err) res.status(500).json(err);
			res.send(`new note has been creating!`);
		})

	})
	
})
// create a delete route using the router
// the endpoint should be '/notes/:id'
// in the callback function
// get the id sent in the request using from req.params
	// use the fs.readFile method to read the db.json file
		// if there is an error respond with a 500 status (res.status) and the error as json (res.json)
		// otherwise, parse the json returned
		// filter the notes returned by the readFile method to include all of the entries whose id doesn't match the id sent in the request .filter()
		// stringify the filtered notes
		// use the fs.writeFile method to write to the db.json file using the filtered, stringified notes
			// if there is an error respond with a 500 status (res.status) and the error as json (res.json)
			// otherwise, return { ok: true } using res.json
router.delete('/notes/:id',(req,res)=>{

	fs.readFile('./db/db.json',(err,data)=>{
		if(err) res.status(500).json(err);
		const notes= JSON.parse(data);
		const filteredNotes= notes.filter(note => note.id !== req.params.id);

		fs.writeFile('./db/db.json',JSON.stringify(filteredNotes),(err)=>{
			if(err) res.status(500).json(err);
			res.status(200).json({ok:true});
		})
	})
})

// export the router
module.exports = router;