
import React, { useEffect, useState } from 'react'
import { Col, Container,Button, Image, Row } from 'react-bootstrap';
import { Telephone } from 'react-bootstrap-icons';
import { FiUser } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { useParams } from 'react-router-dom';

function ViewOneProductById() {
    
 
    
    let {prod_id} = useParams('prod_id');
    const [product, setProduct] = useState({});

  
    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/product/'+prod_id)
        .then(res => res.json())
        .then(res=> {setProduct(res); console.log(res); console.log("request")})
        .catch( err => console.log("INVALID PRODUCT ID") )
        
    },[prod_id])


   
    const printAuthor = (author) => {
            return (<>
               
                    <p> <FiUser/> {author.name}</p>
                    <p> <Telephone/> {author.mobile}</p>
                    <p><MdEmail/> {author.email}</p>
                 </>
            ) 
    }

    return (
        <>
      

        <Container fluid className="bg-light shadow p-sm-4">
            <h4 className=" text-success">Product Details</h4>
            <hr />
             <Row>
                <Col className="col-md-4  col-sm-6 col-10 mb-2" >
                     <Row>
                        <Col className="col-4">
                            <b>ISBN</b>
                        </Col>
                        <Col className="col-8">
                            <b>{product.isbn}</b>
                        </Col>
                        
                    </Row>
                    <hr />
                    <Row>
                        <Image src="https://picsum.photos/200/150" thumbnail />
                    </Row>
                   
                </Col>
                <Col className="col-md-6 mx-auto  col-sm-6 mb-2 pt-md-5" >
                      <Row> 
                        <Col className="">
                            <p><small>Title</small></p>
                            <p><b>{product.title}</b></p>
                        </Col>
                     </Row>

                     <Row> 
                        <Col className="pt-md-2">
                            <p><small>Title in english</small></p>
                            <p><b>{product.title_in_english}</b></p>

                        </Col>
                     </Row>
                     <hr />
                     <Row> 
                        <Col className="pt-md-2">
                            <p><small>Product Type</small></p>
                            <p><b>{product.category?.category}</b></p>

                        </Col>
                        <Col className="pt-md-2">
                            <p><small>Language</small></p>
                            <p><b>{product.language?.language}</b></p>

                        </Col>
                        <Col className="pt-md-2">
                            <p><small>Genre</small></p>
                            <p><b>{product.genre?.genre}</b></p>

                        </Col>
                     </Row>
                    
                     
                </Col>
            </Row>
            <hr/>
             <Row >
                <h5>Product Description</h5>
                <Col className="pb-2">
                <p> Uploaded: {product.avl_date} </p>
                <p> Length: {product.length} </p>
                <p> Description: {product.short_desc} </p>
                </Col>
               
            </Row>
            <hr/>
            
                <h5>Authors</h5>
                <Row>
                {
                    product.authors?.length>0 ? 
                    product.authors?.map( (product,i) =>  <Col className="col-sm-4 col-6 " key={i} >{printAuthor(product)}</Col> )
                    :
                    null
                }
                </Row>
            
             <hr/>
            <Row >
                <h5>Publication</h5>
                <Col className="col-sm-4">
                    <p><b> <FiUser/> {product.publisher?.name}</b></p>
                    <p><b><Telephone/> {product.publisher?.mobile}</b></p>
                    <p><b><MdEmail/> {product.publisher?.email}</b></p>
                </Col>
               
            </Row>
            <hr/>
            <Row className="pt-md-2"> 
                <Col >
                    <p><small>Offer Price</small></p>
                    <p><b>{product.offer_price}</b></p>

                </Col>
                <Col >
                    <p><small>Base Price</small></p>
                    <p><b>{product.base_price}</b></p>

                </Col>
                <Col >
                    <p><small>Selling price</small></p>
                    <p><b>{product.sale_price}</b></p>

                </Col>
                
            </Row>
             <hr/>
            <Row className="pt-2"> 
                <Col >
            
                    {product.is_rentable ?
                        <Button variant="warning" > Rent </Button>
                        : null
                    }
                    &nbsp;&nbsp;
                    {product.is_library ?
                    <Button variant="danger"  > Lent </Button>
                    : null
                    } 
                    &nbsp;&nbsp;
                <Button variant="success"  > Buy </Button>       
                    
                </Col>

                
            </Row>
            <hr/>
        </Container>


            
        </>
    )
}

export default ViewOneProductById
