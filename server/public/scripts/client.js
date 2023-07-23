$(document).ready(onReady)

let solutions;

function onReady(){
// ----- Handlers ------

$('#equalBtn').on('click', handleEquals)

}

// ------ Functions --------
let handleEquals = (event) => {
    event.preventDefault();
    console.log('inside handleEquals');
    let newComputation = {};

    // send data to server
    // route '/compute'
    $.ajax({
        method: "POST",
        url: "/compute",
        data: newComputation
    }).then((response) => {
        console.log("POST was successful:", response) // expect 201

        getSolution()
        render()

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
        
        render()

    }).catch((error) => {
        alert("Request Failed")
        console.log("Request failed, error:", error)
    })
}

let render = () => {
    
    for (let solution of solutions) {
      console.log(solution)
        $('#history').append(`
            <ul>
                <li>
                </li>
            </ul>
        `)  
    }  
}