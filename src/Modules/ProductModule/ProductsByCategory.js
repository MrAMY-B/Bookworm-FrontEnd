import React, { useEffect, useState } from 'react'
import { Col, NavDropdown, Row } from 'react-bootstrap';
import { Link } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import AllProductsByAllGenre from './AllProductsByAllGenre';

function ProductsByCategory() {
    let {cate_id} = useParams('cate_id');

    const [products, setProducts] = useState([])

    let genreList = [ 'Gen1','Gen2','Gen3','Gen3','Gen4' ];

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/all')
        .then( res=> res.json())
        .then( res=> setProducts(res) )
        .catch( err=> console.log(err) )
    },[cate_id])

    

    

    return (
        <>
           <h1 className="text-center text-success">CATEGORY</h1>
            <Row className="mx-0 mb-4 pt-sm-4">

                {genreList.map( (genre,index) => <AllProductsByAllGenre key={index} genre={genre} prodlist={products} /> )}
        
                
            </Row>
            <Link to="/product-by-category/2">  See all here... </Link>
                <NavDropdown.Divider />
        </>
    )
}

export default ProductsByCategory
