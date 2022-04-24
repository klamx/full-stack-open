const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(cors())
// app.use(morgan('tiny'))

morgan.token('data', (request, _) => {
  return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :response-time ms - :data'))

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world!!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).send('<h1>Error not found (401)</h1>')
    // response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const { content, important = false } = request.body
  const date = new Date().toISOString()
  const id = notes.length + 1
  if (!content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const note = { id, content, date, important }
  notes = [...notes, note]
  response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    notes = notes.map((note) => (note.id === id ? request.body : note))
    response.json(note)
  } else {
    response.status(404).send('<h1>Error not found (401)</h1>')
    // response.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
