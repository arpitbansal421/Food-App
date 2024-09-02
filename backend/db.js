const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://arpitbansal421:Priyanshu123@cluster0.ffjyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;