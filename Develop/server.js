// require express and your two routes files
const express= require('express');

// Initialize the app and create a port
const app = express();
const PORT = 3000;
// Set up body parsing middleware for json and url encoded
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// http://expressjs.com/en/api.html#express
// check out server.js in starwars app

 // serve up the public directory using the static middleware
 // https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))
app.listen(PORT,()=>console.log(`listening on PORT: ${PORT}`))
// using app.use() for both route files pass in two arguments:
	// the path ('/api' for api routes and '/' for html routes)
	// the routes that you required
// ***Interestingly, the order is very important here as the html routes depend on the api routes to function so apiRoutes must come first.

// Start the server on the port