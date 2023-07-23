// Requires for the server
// bodyParser for POSTs
const express = require('express')
const bodyParser = require('body-parser')

// --------------------------------------

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

let operation = []

app.get('/solution', (req, res) => {
    console.log("Arrived at /solution ")

    res.sendStatus(200)

})

app.post('/compute', (req, res) => {
    console.log("Body for compute:", req.body);

})

// Port binding
app.listen(port, () => {
    console.log('listening on port', port)
})
