import React, {useState, useEffect} from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Loader from '../Components/Layout/Loader';

const HomePage = () => {
  const [auth, setauth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  const getAllProducts = async () => {

    try {
      
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`);

      if(data?.success) {
        setProducts(data.products);
      } else {
        toast.error("Error While Fetching The Page Data")
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, [])
  


  return (
    <Layout title='Ecommerce - HomePage - Best Offers'>
    <div className="row mt-3">
      <div className="col-md-3">
        <h4 className='text-center'>Filter By Category</h4>
      </div>
      <div className="col-md-9">
        <h1 className='text-center'>All Products</h1>
        <div className="d-flex flex-wrap">
        { !products ? <Loader/> : products.map(p => (
                <Link to={`/dashboard/admin/products/${p?.slug}`} style={{ textDecoration: 'none', color: 'black'}} >
                <div className="card m-2" style={{width: '15rem', height: '21rem', overflow: 'hidden'}}>
                <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`} alt={p.name} height='50%' width={'50%'} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className='price'>{p.price} Rs.</h5>
                  <p className="card-text">{p.description.slice(0, 30)}...</p>
                </div>
              </div>
                </Link>
             ))}
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default HomePage