import express from "express"
import db from '../database/connect.js'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import upload from '../middleware/multer.js'
import { userValidator, userEditValidator, loginValidator } from "../middleware/validate.js"
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', upload.single('photo'), userValidator, async (req, res) => {
    try {
        const userExists = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { username: req.body.username },
                    { email: req.body.email },
                ]
            }
        })
        if (userExists) {
            res.status(401).send('Vartotojas su tokiu vardu ar el.paštu jau egzistuoja')
            return
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        if (req.file) req.body.photo = '/' + req.file.path
        await db.Users.create(req.body)
        res.send('Vartotojas sėkmingai užregistruotas!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/single/:id', auth, async (req, res) => {
    try {
        const user = await db.Users.findByPk(req.params.id, {
            include: {
                model: db.Photos,
                attributes: ['id', 'photo', 'caption', 'createdAt'],
                include: [
                    { model: db.Likes, attributes: ['userId'] },
                    {
                        model: db.Comments,
                        attributes: ['id', 'comment'],
                        include: { model: db.Users, attributes: ['username'] }
                    }
                ]
            },
            order: [
                [db.Photos, 'createdAt', 'DESC']
            ],
        })
        res.json(user)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/search/:keyword', auth, async (req, res) => {
    try {
        const users = await db.Users.findAll({
            where: {
                username: {
                    [Op.substring]: req.params.keyword
                }
            }
        })
        res.json(users)
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.put('/edit/:id', upload.single('photo'), auth, userEditValidator, async (req, res) => {
    try {
        if (req.file) req.body.photo = '/' + req.file.path
        const user = await db.Users.findByPk(req.params.id)
        await user.update(req.body)
        res.send('Vartotojo informacija sėkmingai atnaujinta!')
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.post('/login', loginValidator, async (req, res) => {
    try {
        const user = await db.Users.findOne({ where: { username: req.body.username } })

        if (!user) {
            return res.status(401).send('Neteisingai įvesti duomenys')
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.loggedin = true
            req.session.user = {
                id: user.id,
                username: user.username,
                photo: user.photo
            }
            res.send({ message: 'Prisijungimas sėkmingas', user: req.session.user })
        } else {
            res.status(401).send('Neteisingai įvesti duomenys')
        }
    } catch (e) {
        console.log(e)
        res.status(500).send('Įvyko vidinė serverio klaida')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Atsijungimas sėkmingas')
})

router.get('/check-auth', auth, async (req, res) => {
    res.json(req.session.user)
})

export default router