import React from 'react'
import {FaStar,FaStarHalfAlt,FaRegStar} from 'react-icons/fa';
const Rating = ({ratingValue,numReviews}) => {
  return (
    <div className='rating'>
        <span> { ratingValue >= 1 ? <FaStar/> : ratingValue >= 0.5 ? <FaStarHalfAlt/> : <FaRegStar/> } </span>

        <span> { ratingValue >= 2 ? <FaStar/> : ratingValue >= 1.5 ? <FaStarHalfAlt/> : <FaRegStar/> } </span>

        <span> { ratingValue >= 3 ? <FaStar/> : ratingValue >= 2.5 ? <FaStarHalfAlt/> : <FaRegStar/> } </span>

        <span> { ratingValue >= 4 ? <FaStar/> : ratingValue >= 3.5 ? <FaStarHalfAlt/> : <FaRegStar/> } </span>

        <span> { ratingValue >=5  ? <FaStar/> : ratingValue >= 4.5 ? <FaStarHalfAlt/> : <FaRegStar/> } </span>
 
        <span className='rating-text'>{ numReviews && numReviews }</span>
 



    </div>
  )
}

export default Rating