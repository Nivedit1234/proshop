import { useState,useEffect } from "react";
import { Link,useNavigate,useLocation } from 'react-router-dom';
import {Button,Form,Row,Col} from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import React from 'react'

const RegisterScreen = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('');

  

    const dispatch=useDispatch();
    const navigate=useNavigate(); 

    const [register,{isLoading}]=useRegisterMutation(); 
    
    const {userInfo} = useSelector((state) => state.auth)

    // if you are logged in you wanna get redirected to shipping page in order to that we use the search property in useLocation hook


    // const {search}=useLocation();
    // const sp=new URLSearchParams(search);
    // const redirect=sp.get('redirect') || '/'
    
    //const redirect='/login'

    const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
   

    //use useEffect to check to see if you are logged in 
    //becaues if you are logged in you will get redirected to either homepage / or whatever is there is redirect variable

      useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
      },[userInfo,navigate,redirect])


     const submitHandler=async(e)=>{
          e.preventDefault();
          if(password!==confirmPassword)
          {
            toast.error('Passwords do not match')
            return;
          }
          else{
            try {
                //unwrap mwthod will extract resolved value from the promise
                 const res=await register({name,email,password}).unwrap() 
                 dispatch(setCredentials({...res}));
                 navigate(redirect)
     
               } catch (error) {
                 toast.error(error?.data?.message || error.err)
               }
          }
          
     }
    return (
      
    <FormContainer>
        <h1>Sign Up</h1>
       
        <Form onSubmit={submitHandler} >
             <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}></Form.Control>

            </Form.Group>
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>

            </Form.Group>
            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>

            </Form.Group>
            <Form.Group controlId="confirmPassword" className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}></Form.Control>

            </Form.Group>
            <Button type='submit' variant="primary" className="mt-2"disabled={isLoading}  >Register</Button>
            {isLoading && <Loader/>}
        </Form>
        <Row className="py-3"> 
            <Col>
             Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>  
             {/* //if there is redirect we want to add that onto the link */}
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen







