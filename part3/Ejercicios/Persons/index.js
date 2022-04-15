const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (_, response) => {
  response.json(persons)
})

app.get('/api/info', (_, response) => {
  const date = new Date().toUTCString()
  response.send(`
  <div>
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>
  </div>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => {
    return person.id === id
  })
  console.log(person)
  if (!person) {
    response.status(404).send('<h1>Error 404 not found </h1>')
  }

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
