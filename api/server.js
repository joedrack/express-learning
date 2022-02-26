const express = require('express')
const { v4: uuidv4 } = require('uuid')
const { people, products } = require('./data/data')

const app = express()

const PORT = process.env.PORT || 2000

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1><a href='/api/products'>products</a>")
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, link, price } = product
        return { id, name, link, price }
    })
    res.status(200).json(newProducts)
})

// route for handlying some search queries
app.get('/api/products/query', (req, res) => {
    const { search, limit } = req.query
    // copying the products array in a new array since it's not safe working with the original dataset
    let filteredProducts = [...products]

    // handle 'search' query
    if(search) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.name.startsWith(search);
        })
    }

    if(limit) {
        filteredProducts = filteredProducts.slice(0, Number(limit))
    }

    // if we get an empty array after applying the filter
    if(filteredProducts.length < 1) {
        // res.status(200).send('No value matches your search')
        // since the browser cannot send 2 response for a single request, we need to make sure that we return
        // response to not get in collision with the return of the handler callback ==> res.json()
        return res.status(200).json({ succcess: true, data: [] }) // success because the request successful but no data have been found
    }
    // when either #search nor #limit query get specified the api will return the whole #productsDuplication array
    res.json(filteredProducts)
})

app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const singleProduct = products.find((prod) => prod.id === id);
    if(!singleProduct) {
        return res.status(404).send('Product not available within our stock')
    }
    res.json(singleProduct);
})

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))


