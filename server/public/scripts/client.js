$(document).ready(onReady)

let solutions = [];
let operand;

function onReady(){
// ----- Handlers ------

// listener for equals button
$('#equalBtn').on('click', handleEquals)

// listener for operator buttons
$('.operatorBtn').on('click','button', handleOperator)

// listener for clear button
$('#clearBtn').on('click', handleClear)

}

// ------ Functions --------

function handleClear() {
    console.log('inside handleClear')
    $('#firstNumber').val('');
    $('#secondNumber').val('');
}

function handleOperator (){
    console.log('inside handleOperator')
    operand = $(this).text();
    console.log(operand)

    }


let handleEquals = (event) => {
    event.preventDefault();
    console.log('inside handleEquals');

    const newCalculation = {
        firstNumber: $('#firstNumber').val(),
        operation: operand,
        secondNumber: $('#secondNumber').val(),
    };

    // send data to server
    // route '/compute'
    $.ajax({
        method: "POST",
        url: "/compute",
        data: newCalculation
    }).then((response) => {
        console.log("POST was successful:", response) // expect 201
        getSolution()
    }).catch((error) => {
        console.log("Error with POST request:", error)
        alert("Error with POST")
    })
}

let getSolution = () => {
    // use ajax to retrieve solutions from the server
    // server endpoint: '/solution'

    console.log('inside getSolution')

    $.ajax({
    method: 'GET',
    url: '/solution'
    }).then((response) => {
        console.log(response)
        solutions = response
        renderHistory()
        renderSolution(solutions)

    }).catch((error) => {
        alert("Request Failed")
        console.log("Request failed, error:", error)
    })
}

// call to show solution of current calculation
let renderSolution = () => {
    let currentSolution = solutions[solutions.length - 1].solution
    console.log('current solution:', currentSolution)
    // clear last calculation from dom
    $('#solution').empty();
    // append new solution to dom
    $('#solution').append(`${currentSolution}`)
}

let renderHistory = () => {

    $('#history').empty()
    
    for (let solution of solutions) {
      
        console.log('operand:', operand)
        // console.log('typeof operand:', typeof operand)
        console.log(solution)
       
        $('#history').append(`
            <li>
            ${solution.firstNumber} ${solution.operation} ${solution.secondNumber} = ${solution.solution}
            </li>
         `)
    }
}