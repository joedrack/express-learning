// the controllers will be responsible for treating data
const { people } = require('../api/data/data');

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people })
}

const createPerson = (req, res) => {
    const name = req.body.name
    if(name) {
        const newPerson = { id: performance.now(), name: name}
        return res.status(201).json({ success: true, newPerson })
    }
    res.status(400).json({ success: false, message: 'empty value not supported' });
}

module.exports = {
    getPeople,
    createPerson,
}