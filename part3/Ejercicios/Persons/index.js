const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('data', (request, _) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :data'))

let persons = [
  {
    id: 'jnxcmrtqpqj',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 'ym8x3fhqp4',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 'o2wpcou2tq',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 'i3pw7jvx8l',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const uuid = () => Math.random().toString(36).slice(2)

// no se que pedo
app.get('/images/icons/gear.png', (_, response) => {
  response.end()
})

app.get('/api/persons', (_, response) => {
  return response.json(persons)
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
  const id = request.params.id
  const person = persons.find((person) => {
    return person.id === id
  })
  console.log(person)
  if (!person) {
    response.status(404).send('<h1>Error 404 not found </h1>')
  }

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const newPersons = persons.filter((person) => person.id !== id)
  persons = [...newPersons]
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body
  if (!name && !number) {
    response.status(400).json({ error: 'you must send a name and a number' })
    return
  } else if (!name) {
    response.status(400).json({ error: 'you must send a name' })
    return
  } else if (!number) {
    response.status(400).json({ error: 'you must send a number' })
    return
  }

  const findedName = persons.filter((person) => person.name === name)
  if (findedName.length > 0) {
    response.status(400).json({ error: 'name must be unique' })
    return
  }

  const newPerson = { id: uuid(), name, number }
  persons = [...persons, newPerson]
  response.json(newPerson)
})

//middleware

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
