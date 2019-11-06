var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cute Dog",
		image: "https://images.unsplash.com/photo-1499982793426-964bdcabe8d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Cute Sheep",
		image: "https://images.unsplash.com/photo-1472718888560-1a1292f1cccb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Cute Koala",
		image: "https://images.unsplash.com/photo-1470777639313-60af88918203?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

function seedDB()
{
	Campground.remove({}, function(err){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("removed campgrounds");
			//add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err)
					{
						console.log(err);
					}
					else
					{
						console.log("added a campground");
						//add a few comments
						Comment.create(
							{
								text: "Agree, it is cuteeee!",
								author: "Homie"
							}, function(err, comment){
								if(err)
								{
									console.log(err);
								}
								else
								{
									campground.comments.push(comment);
									campground.save();
									console.log("Created new comment");
								}
							});
					}
				});
			});
		}
	});
}

module.exports = seedDB;