import express from "express"
import db from '../database/connect.js'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import upload from '../middleware/multer.js'
import { photoValidator } from "../middleware/validate.js"
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const photos = await db.Photos.findAll({
            include: [
                { model: db.Users, attributes: ['username', 'photo'] },
                { model: db.Likes, attributes: ['userId'] },
                {
                    model: db.Comments,
                    attributes: ['id', 'comment'],
                    include: { model: db.Users, attributes: ['username'] }
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        })
        res.json(photos)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.post('/', upload.single('photo'), auth, photoValidator, async (req, res) => {
    try {
        if (req.file) req.body.photo = '/' + req.file.path
        await db.Photos.create(req.body)
        res.send('Nuotrauka sėkmingai išsaugota!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const photo = await db.Photos.findByPk(req.params.id, {
            include: [
                { model: db.Comments, include: [{ model: db.Users, attributes: ['username'] }] },
                { model: db.Likes, attributes: ['id', 'userId'] },
                { model: db.Users, attributes: ['username', 'photo'] }
            ]
        })
        res.json(photo)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.put('/:id', upload.single('photo'), auth, photoValidator, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
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