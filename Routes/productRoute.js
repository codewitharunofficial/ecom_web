import express from 'express'
import formidable from 'express-formidable'
import { IsAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {createProductController, deleteProduct, getProductController, getSingleProduct, productPhotoController, updateProduct} from '../controller/createProductController.js'

const router = express.Router();

//create

router.post('/new-product', requireSignIn, IsAdmin, formidable() ,createProductController);

//get products

router.get('/get-product', getProductController);

//get single Product

router.get('/get-a-product/:slug', getSingleProduct);

//update a product

router.put('/update-product/:id', requireSignIn, IsAdmin, formidable(), updateProduct);

//getting the product photo

router.get('/get-photo/:pid', productPhotoController);

//delete a product

router.delete('/delete-product/:pid', requireSignIn, IsAdmin, deleteProduct);



export default router