import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MdCall, MdEmail, MdLocationOn } from 'react-icons/md'

function Contact() {
    return (
        <div>
             <Container className="p-5 ">
             
                <Row className=" pt-2 pb-5 bg-light text-center border shadow-lg justify-content-center">
                <h1 className=" text-success">  Contact Us </h1>
                <hr className="mt-0" />
                    <Col className="col-md-6 col-sm-10 ">
                            <h4>About</h4>
                            <p>
                                Bookworm is aim to set up virtual bookshop that also have library 
                                facility and it will allow users to purchase, rent and / or lend eBooks,
                                 Audiobooks and Videos. All content is in digital form and hence delivered 
                                 instantly by adding products (either purchased, lent, or rented) in user’s account. 
                                 User can access these product from “My Shelf” and read eBooks or play audiobooks or video. 
                                 Purchased products are remain in My shelf forever, however all rented or 
                                 lent products are deleted after validity period
                            </p>
                    </Col>
                    <Col className="col-md-6 col-sm-10 text-left">
                        <h4>Contact</h4>

                        <p> <MdCall /> +918877665544    </p>
                        <p> <MdCall /> +918899788665    </p>
                        <p><MdEmail />info@bookworm.com</p>
                        <p><MdEmail /> admin@bookworm.com</p>
                        <p> <MdLocationOn/>Juhu , Andheri,Mumbai, India </p>


                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Contact
