import React, { useEffect, useState } from 'react'
import { API } from '../../UtilComponents/API'
import {Col, Image, NavDropdown, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'

function ViewAllTransaction() {

    
    let x = 5;
    const [transactions,setTransactions] = useState([]);

    

    useEffect(()=>{
        fetch(API+'/trans/all')
        .then(res=> res.json() )
        .then(res => {setTransactions(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[x])
        
    

    return (
        <>
            <Row className="justify-content-center  p-sm-4">

                <Col md={10}  className="justify-content-center rounded  bg-light pt-4 pb-5 border shadow-lg">
                   
                    <h1 className="text-center text-success">Category List</h1>
                        <NavDropdown.Divider />
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>Tr_Id</th>
                                 <th>Product</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr> 
                        </thead>
                        <tbody> 
        
                            { transactions.map( (tr,i)=> 
                            <tr key={i}>
                                <td>{tr.tr_id}</td>
                                <td>
                                    <OverlayTrigger key={'top'} overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                <p>{'Product Id : '+tr.product?.prod_id}</p>
                                                <strong>{tr.product?.title}</strong>
                                            </Tooltip>
                                        }
                                        >
                                        <Image src="https://picsum.photos/200/150"  width="50"/>
                                    </OverlayTrigger>
                                        
                                    </td>
                                <td>
                                    {tr.user?.uname}
                                    
                                </td>
                                <td>{tr.amt}</td>
                                <td>{tr.date}</td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>
                    </Col>
                </Row> 
        </>
    )
}

export default ViewAllTransaction
