import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Image, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoImage  from './../Images/bw-logo3.png'
import SearchProduct from './SearchProduct'
import {MdTrackChanges } from 'react-icons/md'
import {TextLeft} from 'react-bootstrap-icons'

function MyNavbar({changeUser,sidePanel}) {

    const [isVisibleProductSearch,setIsVisibleProductSearch] = useState(false)
    const [showProductSearch, setShowProductSearch] = useState('d-none')
    
    let handleProductSearch = () =>{
        setIsVisibleProductSearch(!isVisibleProductSearch);

        if(isVisibleProductSearch)
            setShowProductSearch('d-none')
        else
            setShowProductSearch('d-block')
        
            console.log('===>'+isVisibleProductSearch,"====>"+showProductSearch)
    }

    return (
        <>
       
        
            <Navbar sticky="top" className=" py-0" collapseOnSelect expand="md" bg="success" variant="dark">
            <Container fluid className="px-sm-5">
                <TextLeft className="btn text-light border border-1  d-md-none d-block" onClick={()=>sidePanel()} size={50}/>
             <Navbar.Brand as={Link} to="/">
                
            <Image src={LogoImage}  width="60"/> BOOKWORM

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id="menu-button"/>
            <Navbar.Collapse  id="responsive-navbar-nav">
                <Nav className="me-auto text-center">
                    <Nav.Link as={Link} to="/Home">HOME</Nav.Link>
                    <Nav.Link onClick={handleProductSearch} >PRODUCTS</Nav.Link>
                    <Nav.Link as={Link} to="/library-products">LIBRARY</Nav.Link>
                    <Nav.Link as={Link} to="/Contact">CONTACT</Nav.Link>
                    <Nav.Link as={Link} to="/Feedback">FEEDBACK</Nav.Link>
                 
                    
                </Nav>
                <Nav className="text-center">
                    <Nav.Link as={Link} to="/User-Login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/SignUp">Sign Up</Nav.Link>
                    <Nav.Link><MdTrackChanges onClick={changeUser} /> </Nav.Link>

                </Nav>
            </Navbar.Collapse>
            </Container>
            
            </Navbar>
            <SearchProduct display={showProductSearch} closeSearchProduct={handleProductSearch} />

           
            

        </>
    )
}

export default MyNavbar
