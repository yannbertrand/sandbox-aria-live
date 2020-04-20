const form = document.forms[0]

form.onsubmit = (event) => {
    event.preventDefault()

    fetchSuccess()
}

function fetchSuccess() {
    fetch('http://localhost:8080')
        .then(response => response.json())
        .then(console.log)
        .catch(error => console.error(error))
}

function fetchError() {
    fetch('http://localhost:8080/error')
        .then(response => response.text())
        .then(console.log)
        .catch(error => console.error(error))
}

const trips = document.getElementById('trips')
