const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/recipe', require('./routes/recipe'))


app.listen(port, () => {
  console.log(`Foodfiles backend listening at http://localhost:${port}`)
})