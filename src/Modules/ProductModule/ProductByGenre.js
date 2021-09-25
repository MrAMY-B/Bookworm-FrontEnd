import React, { useEffect, useState } from 'react'
import { Col, Container, NavDropdown, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import ProductCard from '../../HomePage/ProductCard';
import { API } from '../../UtilComponents/API';

function ProductByGenre() {

    let {gen_id} = useParams('gen_id');

    const [products, setProducts] = useState([])


    useEffect(()=>{
        fetch(API+'/product/by-gen-id/'+gen_id)
        .then( res=> res.json())
        .then( res=> setProducts(res) )
        .catch( err=> console.log(err) )
    },[gen_id])

    return (
        <>
            <Container >
            <h1 className="text-center text-success">Genre { products[0].genre.genre } </h1>
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

export default ProductByGenre
