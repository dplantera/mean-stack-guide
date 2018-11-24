const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const Post = require('./models/post')

// create express app
// (middleware - intersect client server communication)
const app = express();

//"mongo -u \"foouser\" -p \"foopwd\"
mongoose.connect("mongodb://localhost:27017/mongoDB").then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
// unused in app
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    // CROSS: Allow access from all domains
    res.setHeader('Access-Control-Allow-Origin', '*');
    // CROSS: Allow only request containing defined attributes
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    // CROSS: Only allow certain rest-methods
    res.setHeader('Access-Control-Allow-Methods',"GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

app.post("ap/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    res.status(201).json({
        message: 'Post successfully added!'
    });
    // don't use next here, because responde is already out
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {id:"1", title:"First post", content:"First post content"},
        {id:"2", title:"Second post", content:"Second post content"},
        {id:"3", title:"Third post", content:"Third post content"},
    ];

    // will be returned
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    })
});

// export the app instance
module.exports = app;