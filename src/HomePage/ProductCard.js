
import React from 'react'
import { Card,Button } from 'react-bootstrap'

function ProductCard({product}) {
    return (
        <>
            <Card>
           
            <Card.Img variant="top" src="https://picsum.photos/200/150" />
            <Card.Body>
               <p>Product Name</p>
                <Button variant="outline-success" size="sm">see</Button>&nbsp;&nbsp;
                <Button variant="outline-danger" size="sm">Buy</Button>
            </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard
