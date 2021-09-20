
import React from 'react'
import { Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
    return (
        <   >
            <Card className="shadow">
           
            <Card.Img variant="top" src="https://picsum.photos/200/150" />
            <Card.Body>
               <p>{product.title}</p>
               
                <Button className="btn-sm py-0"as={Link} to={"/products-description/"+product.prod_id} variant="outline-success" >see</Button>&nbsp;&nbsp;
                <Button variant="outline-danger" className="btn-sm py-0">Buy</Button>
            </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard
