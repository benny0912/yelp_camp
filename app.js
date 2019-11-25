var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	flash	   = require("connect-flash"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seed");

//requiring routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var uri = "mongodb://localhost/yelp_camp";
//var uri = "mongodb+srv://benny0912:Pilot@1998@yelpcamp-nhwb3.mongodb.net/test?retryWrites=true&w=majority";
console.log(process.env.DATABASEURL);
mongoose.connect(uri);

//seedDB();
app.use(flash());

//PASSPORT COnfiguration
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.set('trust proxy', 1);
app.use(require("express-session")({
	secret: "Have faith, be patience",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Yelp Server Started!");
});