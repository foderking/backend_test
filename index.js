const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

let notes = [
  {
    "content": "Arto Hellas",
    "number": "040-123456",
    "important": true,
    "id": 1
  },
  {
    "content": "Ada Lovelace",
    "number": "39-44-5323523",
    "important": true,
    "id": 2
  },
  {
    "content": "Dan Abramov",
    "number": "12-43-234345",
    "important": true,
    "id": 3
  },
  {
    "content": "Mary Poppendieck",
    "number": "39-23-6423122",
    "important": true,
    "id": 4
  }
]

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request ,response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
}
)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})