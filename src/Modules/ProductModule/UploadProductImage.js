import React, { useState } from 'react'
import { Col, Form, NavDropdown, Row,Button, Image } from 'react-bootstrap'

function UploadProductImage() {

    const [msg, setMsg] = useState('')
    const [pTmage, setPImage] = useState(null)

    const getImage = (e)=>{
        console.log(e.target.files);
        console.log(e.target.files[0].path);
        setPImage(e.target.files[0].path);

    }

    return (
        <Row className="justify-content-center  py-4 px-md-4 px-2">
            <Col md={8} sm={10} xs={11} className="justify-content-center rounded  bg-light pt-sm-4 pb-5 border rounded   shadow-lg">
            
            <h1 className="text-center text-success"> Upload Front Image </h1>
            <NavDropdown.Divider />
            {msg}
            <Row>
                
                <Col> 
                   <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Product Front Image ( jpg/png/jpeg )</Form.Label>
                            <Form.Control  type="file" onChange={(e)=> getImage(e) } />
                        </Form.Group>
                   </Form>
                    {/* { !pTmage ? null :  <Image src={pTmage} />  } */}
                </Col>
                <p><br/><b> <small>Note : Image Size should be less then 500kb</small> </b></p>
            </Row>

            
            <div className="mt-4 d-grid">
                <Button variant="outline-success"  type="submit" size="lg" >Lent</Button>
            </div>
            </Col>
        </Row>
    )
}

export default UploadProductImage
