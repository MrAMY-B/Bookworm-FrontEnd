
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, NavDropdown, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

function UpdateGenre(props) {

    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const history = useHistory();
    const [oldGen , setOldGen] = useState({});
    let {gen_id} = useParams('gen_id');

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/genre/'+gen_id)
        .then(res => res.json())
        .then(res=> {setOldGen(res); console.log(res); console.log("request")})
        .catch( err => console.log("INVALID Gnere ID") )
        
    },[gen_id])

    console.log(gen_id)

    let handleOnSubmit = (e)=> {
        e.preventDefault()
        
        

        fetch('https://amol-bookworm-api.herokuapp.com/genre/',
            {method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify(oldGen)})
        .then(res => { if(res.ok){
            setShowSuccessAlert(true)
            setTimeout(()=>{ history.push("/admin/genres") } , 2000); console.log("SUCCESS");
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
                <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Failed to update </Alert>
                <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Successfully Updated </Alert>
                <h1 className="text-center text-success"> Update Language </h1>
                    <NavDropdown.Divider />
                    <Form onSubmit={handleOnSubmit}>
                        <h3>Genre Id : { gen_id }</h3>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control type="text" name="genre" value={oldGen.genre} onChange={(e)=> setOldGen({...oldGen,genre:e.target.value})} placeholder="Category" />
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
export default UpdateGenre
