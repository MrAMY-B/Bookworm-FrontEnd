import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, NavDropdown, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { API } from '../../UtilComponents/API';

function UpdateLanguage(props) {

    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const history = useHistory();
    const [oldLang , setOldLang] = useState({});
    let {lang_id} = useParams('lang_id');

    useEffect(()=>{
        fetch(API+'/language/'+lang_id)
        .then(res => res.json())
        .then(res=> {setOldLang(res); console.log(res); console.log("request")})
        .catch( err => console.log("INVALID LANGUAGE ID") )
        
    },[lang_id])

    console.log(lang_id)

    let handleOnSubmit = (e)=> {
        e.preventDefault()
        console.log("SUCCESS");
        

        fetch(API+'/language/',
            {method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify(oldLang)})
        .then(res => { if(res.ok){
            setShowSuccessAlert(true)
            setTimeout(()=>{ history.push("/admin/languages") } , 2000)
        }
        else{
            setShowDangerAlert(true); 
            console.log(res); 
        }
        })
    }

    return (
        <>
            <Row className="justify-content-center  p-sm-4">
                <Col md={6} sm={8} xs={11} className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Failed to update </Alert>
                <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Successfully Updated </Alert>
                <h1 className="text-center text-success"> Update Language </h1>
                    <NavDropdown.Divider />
                    <Form onSubmit={handleOnSubmit}>
                        <h3>ID : { lang_id } | CATE : {oldLang?.category?.category}</h3>
                        <Form.Group>
                            <Form.Label>Language</Form.Label>
                            <Form.Control type="text" name="language" value={oldLang.language} onChange={(e)=> setOldLang({...oldLang,language:e.target.value})} placeholder="Category" />
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

export default UpdateLanguage
