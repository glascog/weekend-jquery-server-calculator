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
let solution;

function calculate(newCalculation) {
    console.log('inside calculate', );
    if (newCalculation.operation === '+'){
        solution = newCalculation.firstnumber + newCalculation.secondNumber
    } if (newCalculation.operation === '-'){
        solution = newCalculation.firstnumber - newCalculation.secondNumber
    } if (newCalculation.operation === '*'){
        solution = newCalculation.firstnumber * newCalculation.secondNumber
    } if (newCalculation.operation === '/'){
        solution = newCalculation.firstnumber / newCalculation.secondNumber
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
