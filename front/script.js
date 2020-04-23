const form = document.forms.roadtripForm
const trips = document.getElementById('trips')
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

// ToDo use aria-live polite to inform deficient users
function displayList(results) {
    resetList()

    const title = document.createElement('h2')
    title.textContent = `Found ${results.length} possible trips`
    title.setAttribute('tabindex', 0)
    title.prepend(compileEmoji('✅'))

    trips.appendChild(title)

    for (const result of results) {
        trips.appendChild(compileItem(result))
    }
}

// ToDo use aria-live polite to inform deficient users
function displayEmptyList() {
    resetList()

    const title = document.createElement('h2')
    title.textContent = 'No trips corresponding'
    title.prepend(compileEmoji('0️⃣'))
    trips.appendChild(title)
}

// ToDo use aria-live assertive to inform deficient users
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

// ToDo try aria-label to describe the emoji
// ToDo use aria-hidden to hide useless emoji
function compileEmoji(content) {
    const emoji = document.createElement('span')
    emoji.setAttribute('aria-hidden', true)
    emoji.textContent = content
    return emoji
}

// ----------------------------------------------

function fetchServer(error = false) {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:8080' + (error ? '/error' : '')
        fetch(url)
            .then(response => response.ok ? response.json() : response.text())
            .then(resolve)
            .catch(reject)
    })
}

function resetList() {
    trips.innerHTML = ''
}

function displayLoaderList() {
    const title = document.createElement('h2')
    title.textContent = 'Loading results...'
    trips.appendChild(title)
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
