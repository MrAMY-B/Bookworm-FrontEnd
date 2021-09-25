import React, { useEffect, useState } from 'react'
import {Link } from 'react-router-dom'
import { Col, Row, Table,Button, NavDropdown } from 'react-bootstrap'
import { MdOpenInNew } from 'react-icons/md'
import { API } from '../UtilComponents/API';

function AllFeedback() {

    let x =5;
    const [allFeedback, setAllFeedback] = useState([])

    useEffect(() => {
        fetch(API+'/feedback/all' )
        .then( res=>  res.json())
        .then(res=>setAllFeedback(res))
        .catch(err=> console.log(err))
    }, [x])

    return (
        <>
             <Row className="justify-content-center  p-sm-4">

            <Col md={10}  className="justify-content-center rounded  bg-light pt-4 pb-5 border shadow-lg">
            

                <h1 className="text-center text-success">Feedback List</h1>
                    <NavDropdown.Divider />
                <Table bordered hover responsive className="text-center">
                    <thead>
                        <tr>
                        <th>No.</th>
                        <th>name</th>
                        <th>email</th>
                        <th>See</th>
                       
                        </tr> 
                    </thead>
                    <tbody> 

                        { allFeedback.map( (feed,i)=> 
                        <tr key={i}>
                        <td>{i+1}</td>
                        <td>{feed.name}</td>
                        <td>{feed.email}</td>
                        <td> <Link to={'/admin/one-feedback/'+feed.f_id}><Button variant="outline-secondary"> <MdOpenInNew/> </Button></Link> </td>
                       
                        </tr>
                        ) }
                    
                    </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}

export default AllFeedback
