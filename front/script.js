const form = document.forms[0]

form.onsubmit = async (event) => {
    event.preventDefault()

    try {
        const result = await fetchServer()
        console.log(result)
    } catch (error) {
        console.log('An error occured while fetching the server')
        console.log(error)
    }
}

function fetchServer(error = false) {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:8080' + (error ? '/error' : '')
        fetch(url)
            .then(response => response.ok ? response.json() : response.text())
            .then(resolve)
            .catch(reject)
    })
}

const trips = document.getElementById('trips')
