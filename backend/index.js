require('dotenv').config()
const {MongoClient} = require('mongodb');
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const uri = "mongodb+srv://brandonbl2021%40gmail.com:Thirstychildren123@cluster0.kdbpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Add route where u add a new user with schema
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running!')
})


app.post('/signup', (req, res)=> {
  console.log(req.body)
  const {username: userDB, password: passwordDB, balance: balanceDB} = req.body;
  const user = {
    username: userDB, 
    password: passwordDB, 
    balance: balanceDB
  }
  client.connect(async (err) => {
    const collection = client.db("BlackJack").collection("Users");
    if (await collection.findOne({username: userDB})){
      res.sendStatus(409)
    }
    else{
      await collection.insertOne(user)
      console.log("user (" + userDB + ", " + passwordDB + ", " + balanceDB + ") has been added!")
      res.sendStatus(200)
    }
});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
