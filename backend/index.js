require('dotenv').config()
const {MongoClient} = require('mongodb');
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
const { response } = require('express');
const { NextWeek } = require('@material-ui/icons');
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Add route where u add a new user with schema
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  client.connect(async err => {
    const collection = client.db("BlackJack").collection("Users");
    if (err){
      res.send("Error: ", err)
    }
    else{
      res.send("Connected to MongoDB")
    }
  })  
})

app.post('/signup', async (req, res)=>{
  console.log('---------/signup---------')
  const {username: userDB, password: passwordDB, balance: balanceDB} = req.body;
  let user = {
    username: userDB, 
    password: passwordDB, 
    balance: balanceDB
  }
  console.log(user)
  client.connect(async err => {
    const collection = client.db("BlackJack").collection("Users");
    if (err){
      res.sendStatus(400)
      console.log(err)
    }
    else if (await collection.findOne({username:userDB})){
      res.sendStatus(409)
      console.log("Sorry, there is already an account with that username.")
    }
    else{
    await collection.insertOne(user)
    console.log("user has been added.")
    res.sendStatus(200)
    }
  })  
})

app.post('/login', async (req, res)=>{
  console.log('---------/login---------')
  const {username: userDB, password: passwordDB} = req.body;
  client.connect(async err => {
    const collection = client.db("BlackJack").collection("Users");
    if (err){
      res.sendStatus(400)
      console.log(err)
    }
    let user = await collection.findOne({username: userDB})
    if (user !== null && user.password === passwordDB){
      res.sendStatus(200)
      console.log("successful login")
    }
    else{
      res.sendStatus(404)
    }
  })  
})

app.get('/leaderboard', async (req, res)=>{
  console.log('---------/leaderboard---------')
  client.connect(async err => {
    const collection = client.db("BlackJack").collection("Users");
    collection.find({}).sort({balance:-1}).toArray((err, result) => {
			if (err){
				res.send(err);
			}
			else{
				res.send(result)
			}
		})
  
		})
})  

app.post('/getbets', async (req, res)=>{
  console.log('---------/getbets---------')
  const {username: userDB} = req.body;
  client.connect(async err => {
    const collection = client.db("BlackJack").collection("Users");
    const user = await collection.findOne({username:userDB})
    if (user !== null && user.username === userDB){
      res.send(user)
    }
    else{
      res.sendStatus(404)
      res.send(err)
    }
		})
})  

app.put('/bet', async (req, res)=>{
  console.log('---------/bet---------')
  const {username: userDB, playerBet:betDB} = req.body;
  client.connect(async err => {
    if (err){
      res.send(err)
    }
    else{
      res.sendStatus(200)
      const collection = client.db("BlackJack").collection("Users");
      const user = await collection.findOne({username:userDB})
      collection.updateOne({username:userDB},{$set:{'balance':(user.balance-betDB)}})
    }
		})
})  

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
