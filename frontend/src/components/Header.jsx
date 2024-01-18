import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {Badge,Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import Logo from '../assets/styles/logo.png';
import {LinkContainer} from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'

import React from 'react'

const Header = () => {
    const {cartItems } =useSelector((state)=>state.cart)
    const {userInfo } =useSelector((state)=>state.auth)

    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const [logoutApiCall]=useLogoutMutation();

    const logoutHandler=async()=>{
            try {
             //unwrap mwthod will extract resolved value from the promise
              await logoutApiCall().unwrap(); 
              dispatch(logout());
              navigate('/login');
            } catch (error) {
               console.error(error)
            }
    }

    console.log(cartItems)
    return (
    <header>
      
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
              <Navbar.Brand>
                <img src={Logo} alt="ProShop"></img>
                ProShop
              </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav'/>
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <LinkContainer to='/cart'>
                    <Nav.Link><FaShoppingCart/>Cart
                    {cartItems.length>0 && (<Badge pill bg='success' style={{marginLeft:'5px'}}>
                      {cartItems.reduce((a,c)=>a+(c.qty),0)}
                    </Badge>)}</Nav.Link>
                    </LinkContainer>
                    {userInfo ? 
                    (<NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                    </NavDropdown>) : (<LinkContainer to='/login'>
                    <Nav.Link><FaUser/>Sign In</Nav.Link>
                    </LinkContainer>)}
                    
                    
                </Nav>
              </Navbar.Collapse> 
            </Container>
        </Navbar>
    </header>
  )
}

export default Header