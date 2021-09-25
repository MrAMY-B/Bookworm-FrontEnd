import React, { useEffect, useState } from 'react'
import {Button, Col, NavDropdown, Row, Table } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { API } from '../../UtilComponents/API';

function LibraryPackages() {

    
    const x = 5;
    const [libpack,setLibpack] = useState([]);
   

    

    useEffect(()=>{
     
        fetch(API+'/lib-pack/all')
        .then(res=> res.json() )
        .then(res => {setLibpack(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[x])
        
    
    

    return (
        <>
           <Row className="justify-content-center  p-sm-4">

                <Col md={10}  className="justify-content-center rounded  bg-light pt-4 pb-5 border shadow-lg">
                   
                   <h1 className="text-center text-success">Library Packages</h1>
                        <NavDropdown.Divider />
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Days</th>
                            <th>Amount</th>
                            <th>No Prod</th>
                            <th>Buy</th>
                            </tr> 
                        </thead>
                        <tbody> 
        
                            { libpack.map( (l,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{l.duration}</td>
                            <td>{l.amount}</td>
                            <td>{l.no_prod}</td>
                            <td> <Link to={'/buy-librarypackage/'+l.pack_id}><Button variant="outline-secondary"><FiEdit size={20} /></Button></Link> </td>
                           
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>
                    </Col>
                </Row> 
        </>
    )
}

export default LibraryPackages

