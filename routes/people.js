const express = require('express')

// exporting controller
const {
    getPeople,
    createPerson,
} = require('../controllers/people')

const router = express.Router()

// router.get('/', getPeople);
// router.post('/', createPerson);

/**
 * Since router.get and router.post share the same uri here, we can chain them using # router.route() method
 * and passs their controllers respectively
 */
router.route('/').get(getPeople).post(createPerson)

module.exports = router

