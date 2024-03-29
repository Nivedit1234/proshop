import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import Rating from '../components/Rating'
const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>

     <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'/>
     </Link>
     
     <Card.Body>

       <Link to={`/product/${product._id}`}>
        <Card.Title as='div' className='product-title'>
          <strong>{product.name}</strong>
        </Card.Title>
       </Link>

       <Card.Text as='div'>
        <Rating ratingValue={`${product.rating}`} numReviews={`${product.numReviews} reviews` } />
       </Card.Text>

       <Card.Text as='h3'>&#x20B9;{product.price}</Card.Text>
  
     </Card.Body>

    </Card>
  )
}

export default Product