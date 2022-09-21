import express from "express"
import db from '../database/connect.js'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import upload from '../middleware/multer.js'
import { commentValidator } from "../middleware/validate.js"
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const comments = await db.Comments.findAll()
        res.json(comments)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.post('/', auth, commentValidator, async (req, res) => {
    try {
        await db.Comments.create(req.body)
        res.send('Komentaras sėkmingai išsaugotas!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const comment = await db.Comments.findByPk(req.params.id)
        res.json(comment)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.put('/:id', auth, commentValidator, async (req, res) => {
    try {
        const comment = await db.Comments.findByPk(req.params.id)
        await comment.update(req.body)
        res.send('Komentaras sėkmingai atnaujintas!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await db.Comments.findByPk(req.params.id)
        await comment.destroy()
        res.send('Komentaras sėkmingai ištrintas!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

export default router