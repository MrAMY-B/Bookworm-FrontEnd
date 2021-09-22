
import React from 'react'
import { Card,Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
    return (
        <   >
            <Card className="shadow">
           
            <Card.Img variant="top" src="https://picsum.photos/200/150" />
            <Card.Body>
               
                    <OverlayTrigger key={'top'} overlay={
                        <Tooltip id={`tooltip-top`}>
                            <strong>{product.title}</strong>
                        </Tooltip>
                    }
                    >
                    <p>{ (product.title.length>12) ? product.title.substr(0,13)+'...' : product.title }</p>
                    </OverlayTrigger>
               
                <Button className="btn-sm py-0"as={Link} to={"/products-description/"+product.prod_id} variant="outline-success" >see</Button>&nbsp;&nbsp;
                <Button variant="outline-danger" className="btn-sm py-0"  as={Link} to={"/buy-product/"+product.prod_id} >Buy</Button>
            </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard
