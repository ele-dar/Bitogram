import express from 'express'
import cors from 'cors'
import session from 'express-session'
// Kontrolerių importavimas
import users from './controller/users.js'
import photos from './controller/photos.js'
import comments from './controller/comments.js'
import likes from './controller/likes.js'

const app = express()

// CORS konfigūracija (blokavimo nuėmimas)
app.use(cors())

// Duomenų priėmimas POST metodu
app.use(express.urlencoded({ extended: true }))

// Static failų panaudojimas
app.use('/uploads', express.static('uploads'))

// Duomenų priėmimas JSON formatu
app.use(express.json())

// Sesijos konfigūracija
app.set('trust proxy', 1)
app.use(session({
    secret: 'labai slapta frazė',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 600000
    }
}))

// Kontrolerių priskyrimas
app.use('/api/users', users)
app.use('/api/photos', photos)
app.use('/api/comments', comments)
app.use('/api/likes', likes)

app.listen(3000)
