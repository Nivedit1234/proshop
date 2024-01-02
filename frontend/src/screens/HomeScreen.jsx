import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'



const HomeScreen = () => {

  const [products,setProduct]=useState([])

  useEffect(()=>{

    const fetchProduct=async ()=>{
      const { data }=await axios.get('/api/products')
      
      setProduct(data);
      console.log(data);
    }
     
    fetchProduct();
  //  console.log(products)
  },[])
// console.log(products);
  return (
    <>
      <h1>
        Latest Products</h1>
      <Row>
        {
            products.map((product)=>(
              
              <Col key={product._id} sm='12' md='6' lg='4' xl='3'>
              <Product product={product} />
              </Col>
             ))
        }
      </Row>
    </>
  )
}

export default HomeScreen