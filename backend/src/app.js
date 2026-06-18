const express = require('express')
const cors = require('cors')                          // -> Middleware de seguridad que le permite habilitar desde donde se pueden hacer re a la api
const helmet = require('helmet')                      // -> Middleware de seguridad contra diferentes vulnerabilidades
const authRoutes = require('./routes/authRoutes')     // -> Importa las rutas donde se usan las autenticacion

const app = express()
app.use(helmet())
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())                               // -> parsea el body como json, sin esto llegaria undefined

app.use('/api/auth', authRoutes)                      // -> monta rutas de autenticacion desde /api/auth (se usa por legibilidad en authRoutes.js, como subnetting)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server corriendo en puerto ${process.env.PORT}`)
})


