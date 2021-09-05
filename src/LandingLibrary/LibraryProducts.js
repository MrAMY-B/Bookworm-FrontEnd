import React from 'react'
import { Col, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProductCard from './ProductCard';

function LibraryProducts() {
    
    
    return (
        <>
            <h1>{category}</h1>
            <Row className="mx-0 mb-4">
                
                { prodlist.slice(0,5).map( (product,i) =>  <Col key={i} className="col-md-2 col-sm-3 col-6"><ProductCard product={product} /></Col> ) }
                
                <Link to="/product-by-category">  See all {category} here... </Link>
                <NavDropdown.Divider />
            </Row>
            
        </>
    )
    }

export default LibraryProducts
