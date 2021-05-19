const express = require("express");
const session = require('express-session');
const mongoDBsession= require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const app = express()

const mongoURI = "mongodb://localhost:27017/sessions";

mongoose
	.connect(mongoURI,{
		useNewUrlParser:true,
		useCreateIndex:true,
		useUnifiedTopology:true,
		
	})
	.then((res) => {
		console.log("MongoDB connecté");
		
	});
const store = new mongoDBsession({
	uri: mongoURI,
	collection: "MaSession"
});
app.use(
	session ({
		secret: 'Clés assigné',
		resave:false,
		saveUnitialized:false,
		store:store,
	
}));
app.get("/",(req, res) =>{
	req.session.isAuth = true;
	res.send("Session tut");
	
});
app.use(express.static('public'));
app.listen(80,
 () => console.log("Le serveur écoute sur le port 80")
)


/*
var http = require('http');

var server = http.createServer();
//console.log(http);

server.on('request',(request, response)=>{
	
	response.write('ui');
	response.end();
	
});

server.listen(5000);

*/