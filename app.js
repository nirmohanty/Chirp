var express= require("express"),
	app= express(),
	bodyParser=require("body-parser"),
	mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/chirp");

var ucount = 0;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//schema setup for chirps
var chirpSchema = new mongoose.Schema({
	user: String,
	text: String
});

var ChirpDb = mongoose.model("ChirpDb", chirpSchema)

/*for users*/
var chirpUsersSchema = new mongoose.Schema({
	user: String,
	pass: String
});

var chirpUsers = mongoose.model("Users", chirpUsersSchema)

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/usersignup", function(req, res){
	res.render("signup");
});

app.get("/userlogin", function(req, res){
	res.render("login");
});

app.post("/userlogin", function(req, res){
	res.redirect("/chirps");
});

app.post("/usersignup", function(req, res){
	var newuser = req.body.newuser,
		newpass = req.body.newpass;
	res.redirect("/chirps");
});

app.get("/chirps", function(req, res){

	ChirpDb.find({}, function(err, allChirps){
		if(err){
			console.log("An error occured while getting the data.");
		}
		else {
			console.log(allChirps);
			res.render("chirps", {chirps:allChirps});
		} 
	});
});

app.post("/writechirp", function(req, res){
	var text = req.body.text;
	var usern = "user" + ucount.toString();
	ucount++;

	ChirpDb.create({
		user : usern,
		text : text
		}, function(err, newChirp){
			if(err){
				console.log("Oops an error occured while adding the chirp!");
			}
			else{
				console.log(newChirp);
		}
	});
	res.redirect("/chirps");
});

app.get("/chirps/new", function(req, res){
	res.render("new.ejs");
});

app.listen(3600, function()
{
	console.log("Chirp has started on port 3600. URL : localhost:3600.");
});