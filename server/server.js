// Requires for the server
// bodyParser for POSTs
const express = require('express')
const bodyParser = require('body-parser')

// --------------------------------------

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))


let calculationHist = [];
let newCalculation;
let calculation;

function calculate() {
    console.log('inside calculate', newCalculation.operation);
    let solution;
    // if(newCalculation.operation){
       
    // }
       
}

app.get('/solution', (req, res) => {
    console.log("Arrived at /solution")

   
    res.send(calculation)

})

app.post('/compute', (req, res) => {
    console.log("Body for compute:", req.body);

    newCalculation = req.body
    // calculationHist.push(newCalculation)

    console.log("currentCalculations:", calculation)
    res.sendStatus(201)

})

// Port binding
app.listen(port, () => {
    console.log('listening on port', port)
})
