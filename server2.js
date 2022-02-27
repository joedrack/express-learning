const express = require('express')
const path = require('path')

// exporting data
const { people } = require('./api/data/data')
const app = express()

// exporting the people router
const peopleRouter = require('./routes/people')

const PORT = process.env.PORT || 2500

// serving static files
app.use(express.static('./public'))

// parsing urlencode
app.use(express.urlencoded({ extended: false }))

// parsing json
app.use(express.json())

app.use('/api/people', peopleRouter); 

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))


