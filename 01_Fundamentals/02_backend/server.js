const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

let todos = [
  { id: 1, text: 'Milch kaufen' },
  { id: 2, text: 'E-Mail beantworten' }
]

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const neuesTodo = {
    id: Date.now(),
    text: req.body.text
  }
  todos.push(neuesTodo)
  res.status(201).json(neuesTodo)
})

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id)
  todos = todos.filter((todo) => todo.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`🚀 Backend läuft unter http://localhost:${PORT}/api/todos`)
})
