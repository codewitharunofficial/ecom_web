import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../Components/Layout/Loader";
import { FaShopify } from 'react-icons/fa';
import { Checkbox, Radio } from "antd";
import {Price} from '../Components/Layout/Price';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);


  const getAllCategories = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/category`);
    if(data?.success) {
     setCategories(data?.category)
     console.log(categories)
    }
}

useEffect(() => {
getAllCategories();
// eslint-disable-next-line
}, []);


//filter by cat

const handleFilter = (value, id) => {
   let all = [...checked]
   if(value) {
    all.push(id)
   } else {
    all = all.filter(c => c!== id)
   }
   setChecked(all)
}


  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product`
      );

      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error("Error While Fetching The Page Data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title="Ecommerce - HomePage - Best Offers">

<h1 className="text-center mb-3" style={{ color: 'black'}}><Link className="navbar-brand" style={{ color: 'black', fontFamily: 'Playfair Display , serif', fontSize: '24px'}} to="/"> <FaShopify />ShopEase</Link></h1>
          <div className="m-3">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active m-3">
      <img className="d-block w-100" src='https://w7.pngwing.com/pngs/561/897/png-transparent-sony-smartwatch-3-apple-watch-android-watch-electronics-gadget-watch-accessory-thumbnail.png' height={'300px'}  alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://mir-s3-cdn-cf.behance.net/projects/404/e6181e120041777.Y3JvcCw5OTksNzgyLDAsMTA4.png" height={'300px'} alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://mir-s3-cdn-cf.behance.net/projects/404/198196113332619.Y3JvcCw5OTksNzgyLDAsMTA4.png" height={'300px'} alt="Third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon-primary" aria-hidden="true" />
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only">Next</span>
  </a>
</div>

          </div>
<hr className="mr-3" style={{borderColor: '#000', borderWidth: '2px', width: '100%' }} />

      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories?.map((c)=> (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
          ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
          <Radio.Group onChange={e => setRadio(e.target.value)}>
            {Price?.map(p => (
              <div key={p._id}>

                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
          </div>
        </div>
        <div className="col-md-9">
          {JSON.stringify(radio, null, 4)}
          <div className="d-flex flex-wrap ">
            {!products ? (
              <Loader />
            ) : (
              products.map((p) => (
                
                  <div
                    className="card m-2 col-md-3" style={{ height: '22rem'}} key={p._id}
                  >
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/products/get-photo/${p._id}`}
                      alt={p.name}
                      height={'40%'}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name.slice(0, 15)}...</h5>
                      <h5 className="price">{p.price.toLocaleString("en-IN", { style:  "currency", currency: "INR"})}</h5>
                      <p className="card-text">
                        {p.description.slice(0, 30)}...
                      </p>
                      <div className="d-flex-between">
                      <button className="btn btn-warning m-1">Buy</button>
                      <button className="btn btn-primary m-1">Add To Cart</button>
                      </div>
                    </div>
                  </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
