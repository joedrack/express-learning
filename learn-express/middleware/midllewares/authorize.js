const authorize = (req, res, next) => {
    const { user } = req.query;
    if(user && user === 'jodrack') {
        // middleware have access to the request obj(i.e it can add on it some properties, -> in this case it add a #user property)
        req.user = { id: 1, name: 'jodrack' };
        console.log('Authorize...')
        next()
    }
    else {
        res.status(401).send('Authorized')
    }
}

module.exports = authorize