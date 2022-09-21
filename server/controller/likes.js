import express from "express"
import db from '../database/connect.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const likes = await db.Likes.findAll()
        res.json(likes)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.post('/', auth, async (req, res) => {
    try {
        await db.Likes.create(req.body)
        res.send('Patiktukas sėkmingai išsaugotas!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const like = await db.Likes.findByPk(req.params.id)
        res.json(like)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const like = await db.Likes.findByPk(req.params.id)
        await like.destroy()
        res.send('Patiktukas sėkmingai pašalintas!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

export default router