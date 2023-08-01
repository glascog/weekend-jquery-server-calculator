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


function calculate(newCalculation) {
    console.log('inside calculate', );
    let solution;
    if (newCalculation.operation === '+'){
        solution = parseInt(newCalculation.firstNumber) + parseInt(newCalculation.secondNumber)
    } else if (newCalculation.operation === '-'){
        solution = parseInt(newCalculation.firstNumber) - parseInt(newCalculation.secondNumber)
    } else if (newCalculation.operation === '*'){
        solution = parseInt(newCalculation.firstNumber) * parseInt(newCalculation.secondNumber)
    } else if (newCalculation.operation === '/'){
        solution = parseInt(newCalculation.firstNumber) / parseInt(newCalculation.secondNumber)
    }       
    newCalculation.solution = solution
    calculationHist.push(newCalculation)
    console.log(newCalculation)
}


app.get('/solution', (req, res) => {
    console.log("Arrived at /solution")
    res.send(calculationHist)

})

app.post('/compute', (req, res) => {
    console.log("Body for compute:", req.body);

    newCalculation = req.body
    calculate(newCalculation)

    console.log("currentCalculations:")
    res.sendStatus(201)
})

// Port binding
app.listen(port, () => {
    console.log('listening on port', port)
})
