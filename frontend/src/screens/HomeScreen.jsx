import React from 'react'
//import axios from 'axios'
//import { useEffect,useState } from 'react'
import {Row,Col} from 'react-bootstrap'
// import products from '../products'
import Product from '../components/Product'
import {useGetProductsQuery} from '../slices/productsApiSlices';
import Loader from '../components/Loader';
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeScreen = () => {

const {keyword,pageNumber}=useParams();

const {data,error,isLoading} =useGetProductsQuery({keyword,pageNumber});
 //console.log(data.products);
  //const Prods=data.products;
  //{console.log(data.products);}
  //console.log(data);
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
     {keyword && <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>}
    {isLoading ? 
    (<Loader></Loader>) :
     error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : 
    
    (<>
     <h1>Latest Products</h1>
      <Row>
        {
            data.products.map((product)=>(
              
              <Col key={product._id} sm='12' md='6' lg='4' xl='3'>
              <Product product={product} />
              </Col>
             ))
        }
      </Row>
      <Paginate page={data.page} pages={data.pages} keyword={keyword ? keyword : ''}/>
      </>)}
     
    </>
  )
}

export default HomeScreen