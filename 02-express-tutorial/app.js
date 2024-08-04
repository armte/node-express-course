
const { products } = require("./data");
const peopleRouter = require("./routes/people")
console.log('Express Tutorial')
const express = require('express');
const app = express()
app.use(express.static("./public"))

function logger(req, res, next) {
  console.log(`req method: ${req.method}`);
  console.log(`res method: ${req.url}`);
  console.log(`current time: ${new Date().toTimeString()}`);
  next();
};

app.use(logger)

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})

app.get('/api/v1/test', logger, (req, res) => {
  return res.status(200).json({message: "It worked!" });
})

app.get('/api/v1/products', (req, res) => {
  return res.status(200).json(products);
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/people', peopleRouter);

// app.get('/api/v1/products/:productID', (req, res) => {
//   res.status(200).json(req.params)
// })

app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = parseInt(req.params["productID"])
  const product = products.find( (product) => product.id === idToFind )
  if (!product) {
    return res.status(404).json( {message: "That product was not found"} )
  }
  return res.status(200).json(product)
})

app.get('/api/v1/query', (req, res) => {
  console.log(req.params)
  let queryProds = [...products];
  const { search, limit, price } = req.query
  if (search) {
    queryProds = queryProds.filter( (product) => product.name.startsWith(search) )
  }
  if (limit) {
    queryProds = queryProds.slice(0, parseInt(limit))
  }
  if (price) {
    queryProds = queryProds.filter( (product) => product.price < Number(price) )
  }
  if (queryProds.length < 1 ) {
    return res.status(200).send('no products matched your search')
  }

  res.status(200).json(queryProds)
  
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource Not Found</h1>')
})
