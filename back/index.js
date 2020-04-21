const http = require('http')
const url = require('url')

const trips = [{
    departure: 'Nantes',
    arrival: 'Paris',
    departureDate: new Date(2020, 10, 10, 10, 2, 0),
    returnDate: new Date(2020, 10, 10, 12, 4, 0)
}, {
    departure: 'Paris',
    arrival: 'Nantes',
    departureDate: new Date(2020, 10, 11, 17, 17, 0),
    returnDate: new Date(2020, 10, 11, 19, 20, 0)
}, {
    departure: 'Brest',
    arrival: 'Paris',
    departureDate: new Date(2020, 10, 10, 10, 20, 0),
    returnDate: new Date(2020, 10, 10, 15, 40, 0)
}, {
    departure: 'Paris',
    arrival: 'Brest',
    departureDate: new Date(2020, 10, 11, 14, 47, 0),
    returnDate: new Date(2020, 10, 11, 19, 20, 0)
}]

const server = http.createServer((req, res) => {
    setTimeout(() => {
        if (url.parse(req.url).pathname === '/error') {
            res.writeHead(404, {'Access-Control-Allow-Origin': '*'})
            return res.end('Page not found')
        }

        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        res.end(JSON.stringify(trips))
    }, 1000)
})

server.listen(8080)
console.log('Server is running')
