import React from 'react'
import { Link } from 'react-router-dom'
import { Col, NavDropdown, Row } from 'react-bootstrap';

import ProductCard from './ProductCard';

function SaperatorByCategory(props) {

    const {oneCate,prodlist} = props;

    

    return (
        <>
            <h3 className="text-dark py-2">{oneCate.category}</h3>
            <Row className="mx-0 mb-4">
                
                { prodlist.slice(0,6).map( (product,i) =>  <Col key={i} className="col-lg-2 col-md-3 col-sm-4 col-6 pt-2">
                                                                <ProductCard product={product} />
                                                            </Col> ) }
                
                <Link to={"/products-by-category/"+oneCate.cate_id} > See All {oneCate.category} Category </Link>
                <NavDropdown.Divider />
            </Row>
            
        </>
    )
}

export default SaperatorByCategory
