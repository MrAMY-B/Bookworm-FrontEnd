import React, { useEffect, useState } from 'react'
import { Col, Container, NavDropdown, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import ProductCard from '../../HomePage/ProductCard';
import { API } from '../../UtilComponents/API';

function AllProductsByLaguage() {

    let {lang_id} = useParams('lang_id');
    let {LANG} = useParams("CATE")

    const [products, setProducts] = useState([])


    useEffect(()=>{
        fetch(API+'/product/by-lang-id/'+lang_id)
        .then( res=> res.json())
        .then( res=> setProducts(res) )
        .catch( err=> console.log(err) )
    },[lang_id])

    return (
        <>
            <Container >
            <h1 className="text-center text-success"> {'All '+LANG} </h1>
            <Row className="mx-0 my-4">
                
                { products.map( (product,i) =>  <Col key={i} className="col-lg-2 col-md-3 col-sm-4 col-6 pt-2">
                                                                <ProductCard product={product} />
                                                            </Col>  ) }
                
                
                
            </Row>
            <NavDropdown.Divider />
            </Container>
        </>
    )
}

export default AllProductsByLaguage
