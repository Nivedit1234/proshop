import React from 'react'
//import axios from 'axios'
//import { useEffect,useState } from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
import {useGetProductsQuery} from '../slices/productsApiSlices';


const HomeScreen = () => {


const {data:products,error,isLoading} =useGetProductsQuery();

  
//  const [products,setProduct]=useState([])

  // useEffect(()=>{

  //   const fetchProduct=async ()=>{
  //     const { data }=await axios.get('/api/products')
      
  //     setProduct(data);
  //     //console.log(data);
  //   }
     
   // fetchProduct();
  //  console.log(products)
 // },[])
// console.log(products);
  return (
    <>
    {isLoading ? 
    (<h2>Loading</h2>) :
     error ? (<div>{error?.data?.message || error.error}</div>) : 
    
    (<>
     <h1>Latest Products</h1>
      <Row>
        {
            products.map((product)=>(
              
              <Col key={product._id} sm='12' md='6' lg='4' xl='3'>
              <Product product={product} />
              </Col>
             ))
        }
      </Row>
      </>)}
     
    </>
  )
}

export default HomeScreen