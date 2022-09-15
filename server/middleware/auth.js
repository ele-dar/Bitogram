export const auth = (req, res, next) => {
    if (req.session.loggedin)
        return next()
    res.status(401).send('Session timeout')
}