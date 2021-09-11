import React from 'react'
import { Col, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../../HomePage/ProductCard';


function SapratorByLanguage(props) {

    const {oneLanguage,prodlist} = props;

    

    return (
        <>
            <h3 className="text-dark py-2">{oneLanguage.language}</h3>
            <Row className="mx-0 mb-4">
                
                { prodlist.slice(0,6).map( (product,i) =>  <Col key={i} className="col-lg-2 col-md-3 col-sm-4 col-6 pt-2">
                                                                <ProductCard product={product} />
                                                            </Col> ) }
                
                <Link to={'/products-by-language/'+oneLanguage.lang_id}>  See all {oneLanguage.language} here... </Link>
                <NavDropdown.Divider />
            </Row>
            
        </>
    )
}


export default SapratorByLanguage
