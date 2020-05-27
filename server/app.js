const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = "mongodb+srv://gustaf:discorediscore@discore-w4mrp.mongodb.net/DiscGolfScores?retryWrites=true&w=majority";

const User = require('./model/user');
const Post = require('./model/post');
const Course = require('./model/course');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.post('/api/user/login', (req, res) => {

	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, function (err) {
		if (err) throw err;
		User.find({
			username: req.body.username,
			password: req.body.password
		}, function (err, user) {
			if (err) throw err;
			if (user.length === 1) {
				return res.status(200).json({
					status: 'success',
					data: user
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Login Failed'
				})
			}

		})
	});
})

app.post('/api/user/create', (req, res) => {
	mongoose.connect(url, function (err) {
		if (err) throw err;
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, res) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	});
})

app.post('/api/course/createCourse', (req, res) => {
	mongoose.connect(url, function (err) {
		if (err) throw err;
		const user = new Course({
			name: req.body.name,
			location: req.body.location,
			par: req.body.par
		})
		user.save((err, res) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	});
})

app.post('/api/course/getAllCourses', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, function (err) {
		if (err) throw err;
		Course.find({}, [], {
			sort: {
				name: 1
			}
		}, (err, doc) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/course/getCourse', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, function (err) {
		if (err) throw err;
		Course.find({
			name: req.body.name,
		}, (err, doc) => {
			if (err) throw err;
			if (doc.length === 1) {
				return res.status(200).json({
					status: 'success',
					data: doc['0']
				})
			} else {
				return res.status(200).json({
					status: 'fail',
					message: 'Course not in database'
				})
			}

		})
	});
})



app.post('/api/post/createPost', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, function (err) {
		if (err) throw err;
		const post = new Post({
			name: req.body.name,
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			par: req.body.par
		})
		post.save((err, doc) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/getPost', (req, res) => {
	mongoose.connect(url, function (err) {
		if (err) throw err;
		const post = new Post({
			title: req.body.title,
			description: req.body.description,
			name: req.body.name
		})
		post.save((err, res) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
	});
})

app.post('/api/post/getAllPost', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, function (err) {
		if (err) throw err;
		Post.find({}, [], {
			sort: {
				date: -1
			}
		}, (err, doc) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.post('/api/post/getYourPost', (req, res) => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}, function (err) {
		if (err) throw err;
		Post.find({
			name: req.body.name,
		}, [], {
			sort: {
				date: 1,
			}
		}, (err, doc) => {
			if (err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
	});
})

app.listen(3000, () => console.log('Blog server running on port 3000!'))