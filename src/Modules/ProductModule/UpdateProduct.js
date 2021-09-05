import React, { useEffect, useState } from 'react'
import { Col, Container,Button, Image, Row } from 'react-bootstrap';
import { Telephone } from 'react-bootstrap-icons';
import { FiUser } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';



const UpdateProduct = () =>{

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
      

        <Container fluid className="py-4">
            <div className="bg-light shadow px-sm-3 py-sm-4 ">

            
           <Row className="justify-content-between"> 
                <Col className="col-4"><h4>Product Details</h4> </Col> 
                <Col className=" col-sm-2 col-5"><Button > Edit Product</Button></Col> 
            </Row>
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
                        <Col className="col-8">
                            <p><small>Title</small></p>
                            <p><b>{product.title}</b></p>
                        </Col>
                     </Row>

                     <Row> 
                        <Col className="pt-md-2">
                            <p><small>Title in English</small></p>
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
             <Row >
                <h5>Product Description</h5>
                <Col className="pb-2">
                    <p> Uploaded: {product.avl_date} </p>
                    <p> Length: {product.length} </p>
                    <p> Description: {product.short_desc} </p>
                </Col>
                
                <Col className="pb-2">
                <p> Is Rentable : {product.is_rentable? 'Yes' : 'No' } </p>
                <p> Is Lentable : {product.is_library? 'Yes' : 'No' } </p>
            </Col>
               
            </Row>
            <hr/>
          
            <Row className="">
                <p><b>Long Description: </b> { product.long_desc}</p>
            </Row>
            <hr/>
                <Row className="justify-content-between"> 
                    <Col className="col-2"><h5>Authors </h5> </Col> 
                    <Col className=" col-sm-2 col-4"><Button size="sm"> Edit Authors</Button></Col> 
                </Row>
                <Row>
                {
                    product.authors?.length>0 ? 
                    product.authors?.map( (product,i) =>  <Col className="col-sm-4 col-6 " key={i} >{printAuthor(product)}</Col> )
                    :
                    null
                }
                </Row>
            
             <hr/>
            <Row className="justify-content-between"> 
                <Col className="col-4"><h5>Publication </h5> </Col> 
                <Col className=" col-sm-2 col-4"><Button as={Link} to={"/admin/update-product-publisher/"+prod_id} size="sm">Edit Publisher </Button></Col> 
            </Row>
            <Row >
                <Col className="col-sm-4">
                    <p><b> <FiUser/> {product.publisher?.name}</b></p>
                    <p><b><Telephone/> {product.publisher?.mobile}</b></p>
                    <p><b><MdEmail/> {product.publisher?.email}</b></p>
                </Col>
               
            </Row>
            <hr/>
            
            </div>

        </Container>


            
        </>
    )
}

export default UpdateProduct