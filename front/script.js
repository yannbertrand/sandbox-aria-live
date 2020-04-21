const form = document.forms.roadtripForm
const checkboxGenerate404 = form.querySelector('[name="generateError"]')

form.onsubmit = async (event) => {
    event.preventDefault()

    try {
        resetList()
        displayLoaderList()
        const result = await fetchServer(checkboxGenerate404.checked)

        if (typeof result === 'object') {
            displayList(result)
        } else {
            displayEmptyList()
        }
    } catch (error) {
        console.log('An error occured while fetching the server')
        console.log(error)
        displayError(error)
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

function resetList() {
    trips.innerHTML = ''
}

function displayLoaderList() {
    const title = document.createElement('h2')
    title.textContent = 'Loading results...'
    trips.appendChild(title)
}

function displayList(results) {
    resetList()

    const title = document.createElement('h2')
    title.textContent = `Found ${results.length} possible trips`
    title.prepend(compileEmoji('✅'))

    trips.appendChild(title)

    for (const result of results) {
        trips.appendChild(compileItem(result))
    }
}

function displayEmptyList() {
    resetList()
    const title = document.createElement('h2')
    title.textContent = 'No trips corresponding'
    title.prepend(compileEmoji('0️⃣'))
    trips.appendChild(title)
}

function displayError() {
    resetList()

    const title = document.createElement('h2')
    title.textContent = 'The server is unavailable'
    title.prepend(compileEmoji('❌'))
    trips.appendChild(title)

    const subtitle = document.createElement('h3')
    subtitle.textContent = 'Please try again in a few sec'
    trips.appendChild(subtitle)
}

function compileEmoji(content) {
    const emoji = document.createElement('span')
    emoji.textContent = content
    return emoji
}

function compileItem({ departure, arrival, departureDate, returnDate }) {
    let item = document.createElement('div')
    item.classList.add('choice')

    const departureRealDate = new Date(departureDate)
    const returnRealDate = new Date(returnDate)
    let description = document.createElement('p')
    description.textContent = `From ${departure} to ${arrival}. Departure on ${departureRealDate.toLocaleDateString()}, return on ${returnRealDate.toLocaleDateString()}`

    let button = document.createElement('button')
    button.textContent = 'Choose this trip'

    item.appendChild(description)
    item.appendChild(button)

    return item
}
