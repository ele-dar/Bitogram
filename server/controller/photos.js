import express from "express"
import db from '../database/connect.js'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import upload from '../middleware/multer.js'
import { photoValidator } from "../middleware/validate.js"
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const photos = await db.Photos.findAll()
        res.json(photos)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.post('/', upload.single('photo'), photoValidator, async (req, res) => {
    try {
        if (req.file) req.body.photo = '/' + req.file.path
        await db.Photos.create(req.body)
        res.send('Nuotrauka sėkmingai išsaugota!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const photo = await db.Photos.findByPk(req.params.id)
        res.json(photo)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.put('/:id', upload.single('photo'), photoValidator, async (req, res) => {
    try {
        if (req.file) req.body.photo = '/' + req.file.path
        const photo = await db.Photos.findByPk(req.params.id)
        await photo.update(req.body)
        res.send('Nuotrauka sėkmingai atnaujinta!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const photo = await db.Photos.findByPk(req.params.id)
        await photo.destroy()
        res.send('Nuotrauka sėkmingai ištrinta!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

export default router