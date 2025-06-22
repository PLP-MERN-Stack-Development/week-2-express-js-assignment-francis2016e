import express from 'express';
import {v4 as uuidv4} from 'uuid';
import apiKeyAuth from '../middleware/auth.js';
import { validateProduct, validateProductUpdate } from '../middlewares/validators.js';
import asyncWrapper from '../middleware/asyncWrapper.js';
import NotFoundError from '../errors/NotFoundError.js';


const router = express.Router();


let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];


router.get('/', (req,res) =>{
  res.send(products)
});
router.get('/test', asyncWrapper(async (req, res) => {
  throw new NotFoundError('This test route does not exist.');
}));



// to list all then product
router.get('/products', (req,res) =>{
  res.send(products);
});


// create a new product
router.post('/products', apiKeyAuth, validateProduct, (req,res) =>{
   const product = req.body;
  const productid = uuidv4();
  const productWithId = { id: productid,... product,};

  const newProduct = products.push(productWithId);
  res.send(newProduct);

})


// find a product with a specified id
router.get('/products/:id', (req,res) =>{
  let {id} = req.params;
 const product = products.find((p)=>p.id === id)
  res.send(product)

})


// to update a product
router.patch('/products/:id', apiKeyAuth, validateProductUpdate, (req,res) =>{
  const {id} = req.params;
  const {price,inStock, category, description, name} = req.body;
  const product = products.find((product) =>product.id === id)

  if(price) product.price = price;
  if(inStock) product.inStock = inStock;
  if(category) product.category = category;
  if(description) product.description = description;
  if(name) product.inStock = name;

  res.send(`product with id ${id} has been succefully updated`)
  

})

router.delete('/products/:id', apiKeyAuth, (req,res) =>{
  const {id} = req.params;
  const product = products.filter((product)=>product.id != id)

  res.send(`product with the id ${id} has been deleted successfully`)
})



export default router