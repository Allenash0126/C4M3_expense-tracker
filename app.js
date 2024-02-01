const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => {
  res.send('I am Lemon!')
})

app.listen(port, () => {
  console.log(`It is running on server http://localhost:${port}`)
})