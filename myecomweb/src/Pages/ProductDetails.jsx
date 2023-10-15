import React, {useState, useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductDetails = () => {

    // const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    // const [quantity, setQuantiity] = useState("");
    // const [category, setCategory] = useState("");
    const [id, setId] = useState('');
    const [slug, setSlug] = useState('');
    const params = useParams();

    const getTheProduct = async () => {
        try {

            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-a-product/${params.slug}`);

            if(data?.success) {
                setName(data?.product?.name);
                setPrice(data?.product?.price);
                setSlug(data?.product?.slug);
                setDescription(data?.product?.description);
                setId(data?.product?._id);
            } else {
                toast.error(data?.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getTheProduct();
      //eslint-disable-next-line
    }, [])
    

  return (
    <Layout>
        <h1 className='text-center m-4'>Product Details</h1>

        <div className="row mt-4">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
      
        </div>
        <div className="col-md-9">
          <div className="d-flex flex-wrap ">
                
                  <div
                    className="card m-2 col-md-9" >
            
                    
                    <img
                      className="card-img-top p-2"
                      src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${id}`}
                      alt={name}
                      height={'50%'}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <h5 className="price">{price.toLocaleString("en-IN", { style:  "currency", currency: "INR"})}</h5>
                      <h3>Features</h3>

                      <div >
                      <p className="card-text" >
                        {description}
                      </p>
                      </div>
                      
                      <div className="d-flex" style={{justifyContent: 'space-around', position: 'absolute', bottom: '10px'}}>
                      <button className="btn btn-warning m-1">Buy</button>
                      <button className="btn btn-primary m-1">Add To Cart</button>
                      </div> 
                    </div>
                  </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default ProductDetails