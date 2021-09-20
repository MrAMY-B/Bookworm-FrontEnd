import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Container, Image, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoImage  from './../Images/bw-logo3.png'
import SearchProduct from './SearchProduct'
import { MdTrackChanges } from 'react-icons/md'

function MyNavbar({changeUser}) {

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
       
        
            <Navbar sticky="top" collapseOnSelect expand="lg" bg="success" variant="dark">
            <Container>
            <Navbar.Brand as={Link} to="/">
                
            {/* <img src="./public/bw-logo3.png"  width="70"/> BOOKWORM */}
            <Image src={LogoImage}  width="60"/> BOOKWORM

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id="menu-button"/>
            <Navbar.Collapse  id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Home">HOME</Nav.Link>
                    <Nav.Link onClick={handleProductSearch} >PRODUCTS</Nav.Link>
                    <Nav.Link as={Link} to="/library-products">LANDING LIBRARY</Nav.Link>
                    <Nav.Link as={Link} to="/Contact">CONTACT</Nav.Link>
                    <Nav.Link as={Link} to="/Feedback">FEEDBACK</Nav.Link>
                    <NavDropdown title="ADMIN" id="collasible-nav-dropdown"  menuVariant="dark">
                        <NavDropdown.Item >More</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/About-us">ABOUT</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/Contact">CONTACT</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/Feedback">FEEDBACK</NavDropdown.Item>
                    </NavDropdown> 
                    
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/User-Login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/SignUp">Sign Up</Nav.Link>
                    <Nav.Link><MdTrackChanges onClick={changeUser} /> </Nav.Link>
                    <Nav.Link>
                           
                    </Nav.Link>
                    

                </Nav>
            </Navbar.Collapse>
            </Container>
            
            </Navbar>
            <SearchProduct display={showProductSearch} closeSearchProduct={handleProductSearch} />

           
            

        </>
    )
}

export default MyNavbar
