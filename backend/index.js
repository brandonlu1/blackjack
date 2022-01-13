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

  res.send('Server is running!')
})

app.post('/signup', async (req, res)=>{
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
    else{
    if (await collection.findOne({username:userDB})){
      res.sendStatus(409)
      console.log("Sorry, there is already an account with that username.")
    }
    else{
    await collection.insertOne(user)
    console.log("username " + userDB + " has been added.")
    res.sendStatus(200)
    }
  }
  })  
})

app.post('/login',(req,res)=>{
  const {username: userDB, password: passDB} = req.body
  client.connect(err => {
    const collection = client.db("BlackJack").collection("Users");
    let user = collection.findOne({username:userDB})
    if (user !== null && user.password === passDB){
      res.sendStatus(200)
      console.log(userDB + "has logged in.")
    }
    else{
      res.sendStatus(404)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
