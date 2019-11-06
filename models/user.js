var mongoose = require("mongoose");
	passportLocalMongoose = require("passport-local-mongoose");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var userSchema = mongoose.Schema({
	username: String,
	password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);