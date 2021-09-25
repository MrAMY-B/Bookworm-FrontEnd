import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { API } from '../UtilComponents/API';

function OneFeedback() {

    
    let {f_id} = useParams('f_id')
    const [user,setUser] = useState({})
    
    useEffect(() => {
       fetch(API+'/feedback/'+f_id).then(res => res.json()).then(res=>setUser(res))
       .catch(err=> console.log(err))
    }, [f_id])

 
    return (
        <>
            <h1 className="text-center text-success">Feedback Details : {f_id} </h1>
            
           <Row className="justify-content-center  p-4">
            <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
            <Container>
                <Row>
                    <Col className="text-center">
                    <h4>Name : {user.name}</h4>
                    <h4>Email : {user.email} </h4>
               
                    <h4>Feedback : {user.query}</h4>
                    <hr />
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>      
           
        </>
    )
}


export default OneFeedback
