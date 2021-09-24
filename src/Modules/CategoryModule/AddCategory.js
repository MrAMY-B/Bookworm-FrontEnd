import React, { useState } from 'react'
import { API } from '../../UtilComponents/API'
import { Alert, Button, Col, Form, NavDropdown, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

function AddCategory() {

    
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const history = useHistory();
    const [cate , setCate] = useState({category:''});

  

    let handleOnSubmit = (e)=> {
        e.preventDefault()
        console.log("SUCCESS");
        

        fetch(API+'/category/', {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(cate)})
        .then(res => { if(res.ok){
            setShowSuccessAlert(true)
            setTimeout(()=>{ history.push("/admin/categories") } , 2000)
        }
        else{
            setShowDangerAlert(true); 
            console.log(res); 
        }
    })

}
    

    return (
        <>
        <Row className="justify-content-center  p-4">
            <Col md={6} sm={8} xs={11} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
            <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Please try again.! </Alert>
            <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Category added successfully. </Alert>
            <h1 className="text-center text-success"> Add New Category </h1>
                <NavDropdown.Divider />
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label>Categry</Form.Label>
                        <Form.Control type="text" name="category" value={cate.category} onChange={(e)=> setCate({...cate,category:e.target.value})} placeholder="Category" />
                        <Form.Text> </Form.Text>
                     </Form.Group>
                    <Form.Group className="mt-4 d-grid">
                            <Button variant="outline-success" type="submit" size="lg" >Submit</Button>
                        </Form.Group>
                </Form>
            </Col>
        </Row>
    </>
    )
}

export default AddCategory
