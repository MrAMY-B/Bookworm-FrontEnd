import React, { useState } from 'react'
import { Alert, Button, Col, Form, NavDropdown, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function AddGenre(){

    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const history = useHistory();
    const [gen , setGen] = useState({category:''});


    let handleOnSubmit = (e)=> {
        e.preventDefault()
        
        

        fetch('https://amol-bookworm-api.herokuapp.com/genre/',
            {method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(gen)})
        .then(res => { if(res.ok){
            setShowSuccessAlert(true)
            setTimeout(()=>{ history.push("/admin/genres") } , 2000);
            console.log("SUCCESS");
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
            <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Genre added successfully. </Alert>
            <h1 className="text-center text-success"> Add New Genre </h1>
                <NavDropdown.Divider />
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" name="genre" value={gen.genre} onChange={(e)=> setGen({...gen,genre:e.target.value})} placeholder="Genre" />
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

export default AddGenre
