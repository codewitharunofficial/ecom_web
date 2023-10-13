import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from 'fs';
// import { count } from "console";



export const createProductController = async (req, res) =>{

    try {
        
      const {name, slug, description, quantity, price, category, shipping } = req.fields;
      const {photo} = req.files;

      //validation

      switch(true) {
        case !name: throw new Error("Name Is Required");
        case !description: throw new Error("Description Is Required");
        case !quantity: throw new Error("Quantity Is Required");
        case !category: throw new Error("Category Is Required");
        case !price: throw new Error("Price Is Required");
        
        case photo && photo.size > 1000000: throw new Error("Photo is Required & Should be less than 1mb");

      
      }
      const product = new productModel({...req.fields, slug:slugify(name)});

      if(photo){
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }

      await product.save();
      res.status(200).send({
        success: true,
        message: "Product Added Successfully",
        product
      })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Posting New Product",
            error
        })
    }

}


//get all product

export const getProductController =  async (req, res) =>{

try {

  const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt: -1});
  res.status(200).send({
    success: true,
    message: "All Products Fetched Successfully",
    products,
    totalProducts: products.length,
  })
  
} catch (error) {
  console.log(error)
  res.status(500).send({
    success:false,
    message: "Error While Getting Products",
    error
  })
}

}

//Get Single Product

export const getSingleProduct  = async (req, res) => {
       try {
        
      const product = await productModel.findOne({slug: req.params.slug}).select("-photo");
      res.status(200).send({
        success: true,
        message:'Product Fetching SSuccessfull',
        product
      })

       } catch (error) {
        console.log(error)
        res.status(500).send({
          success: false,
          message:"Error in Getting Product",
          error
        })
       }
}

//update a product

export const updateProduct = async (req,  res)=>{

  try {
        
    const {name, description, quantity, price, category, shipping } = req.fields;
    const {photo} = req.files;

    //validation

    switch(true) {
      case !name: throw new Error("Name Is Required");
      case !description: throw new Error("Description Is Required");
      case !quantity: throw new Error("Quantity Is Required");
      case !category: throw new Error("Category Is Required");
      case !price: throw new Error("Price Is Required");
      
      case photo && photo.size > 1000000: throw new Error("Photo is Required & Should be less than 1mb");

    
    }
    const product = await productModel.findByIdAndUpdate(req.params.id, {...req.fields, slug:slugify(name)}, {new: true});

    if(photo){
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product Uppdated Successfully",
      product
    })



  } catch (error) {
      console.log(error)
      res.status(500).send({
          success: false,
          message: "Error While Updating the Product",
          error
      })
  }

}

//fetching product photo

export const productPhotoController = async (req,res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

  if(product.photo.data){
    res.set("Content-type", product.photo.contentType);
    res.status(200).send(product.photo.data);
  } 

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error while getting the product's Photo"
    })
  }
}

//deleting a product

export const deleteProduct = async (req, res) => {

  try {

    const product = await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product has Successfully Been Deleted",
      
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message:"Error While Deleting a Product"
    })
  }

}