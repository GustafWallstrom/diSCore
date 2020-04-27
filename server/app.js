const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://localhost/blogDb";

const MongoClient = require("mongodb").MongoClient;
const uri =
	"mongodb+srv://gustaf:discorediscore@discore-w4mrp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const User = require("./model/user");

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.post("/api/user/login", (req, res) => {
	MongoClient.connect(uri, {
			useUnifiedTopology: true,
		})
		.then((client) => {
			console.log("Connected to Database");
			const db = client.db("DiscGolfScores");
			const scoreCollection = db.collection("discScores");

			//bodyParser before CRUD!
			app.use(
				bodyParser.urlencoded({
					extended: true,
				})
			);
			app.use(bodyParser.json());

			User.find({
					username: req.body.username,
					password: req.body.password,
				},
				function (err, user) {
					if (err) throw err;
					if (user.length === 1) {
						return res.status(200).json({
							status: "success",
							data: user,
						});
					} else {
						return res.status(200).json({
							status: "fail",
							message: "Login Failed",
						});
					}
				}
			);
		})
		.catch((error) => console.error(error));
	//   mongoose.connect(
	//     uri,
	//     {
	//       useMongoClient: true,
	//     },
	//     function (err) {
	//       if (err) throw err;
	//       User.find(
	//         {
	//           username: req.body.username,
	//           password: req.body.password,
	//         },
	//         function (err, user) {
	//           if (err) throw err;
	//           if (user.length === 1) {
	//             return res.status(200).json({
	//               status: "success",
	//               data: user,
	//             });
	//           } else {
	//             return res.status(200).json({
	//               status: "fail",
	//               message: "Login Failed",
	//             });
	//           }
	//         }
	//       );
	//     }
	//   );
});

app.post("/api/user/create", (req, res) => {
	MongoClient.connect(uri, {
			useUnifiedTopology: true,
		})
		.then((client) => {
			const user = new User({
				name: req.body.name,
				username: req.body.username,
				password: req.body.password,
			});
			user.save((err, res) => {
				if (err) throw err;
				return res.status(200).json({
					status: "success",
					data: res,
				});
			});
		})
		.catch((error) => console.error(error));
});

app.listen(3000, () => console.log("Server running on port 3000!"));