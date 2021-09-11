
import React, { useEffect, useState } from 'react'
import { Col, NavDropdown, Row, Table, Button } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDelete, MdOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AlertComponent from '../../UtilComponents/AlertComponent';

function Publishers() {
    const [publisher,setPublisher] = useState([]);
    const [resp,setResp ] = useState()

    
 
    useEffect(()=>{

        

        fetch('https://amol-bookworm-api.herokuapp.com/publisher/all')
        .then(res=> res.json() )
        .then(res => {setPublisher(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[resp])
        
    
    let deletePublisher = (id,name)=>{
        let password = prompt("Enter your password to delete "+id+", "+name+" !");
        console.log(password)


        if(!password){
            console.log("Not deleting");
            
        }
        else if( password === 'AMOL' ){
            
        fetch('https://amol-bookworm-api.herokuapp.com/publisher/'+id,{ method:"DELETE" })
        .then(res => { 
            console.log('deletd...'+name,res);
            setResp(<AlertComponent type="success" msg={`Publisher ${name} is deleted...`}/>)
            
        })
        .catch(err=> {
            console.log(err)
            setResp(<AlertComponent type="warning" msg={`Publisher can not be is deleted...`}/>)
        })

           
        }
        else{
            setResp(<AlertComponent type="warning" msg={`Password is incurrect`}/>)
        }
    }


    
    return (
        <>
             <Row className="justify-content-center  p-4">

                    <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                        {resp}
                        <h1 className="text-center text-success">Publisher List</h1>
                            <NavDropdown.Divider />
                        <Table bordered hover responsive className="text-center">
                            <thead>
                                <tr>
                                <th>No.</th>
                                <th>Product Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>See</th>
                                <th>Update</th>
                                <th>Delete</th>
                                </tr> 
                            </thead>
                            <tbody> 

                                { publisher.length===0 ? 'Loading data...' :  publisher.map( (pub,i)=> 
                                <tr key={i}>
                                <td> {i+1}  </td>
                                <td>{pub.pub_id}</td>
                                <td>{pub.name}</td>
                                <td>{pub.email}</td>
                                <td><Button variant="outline-success"><MdOpenInNew />  </Button></td>
                                <td> <Link to={'/admin/update-product/'+pub.pub_id}>
                                        <Button variant="outline-secondary"> 
                                            <FiEdit size={20} />
                                        </Button></Link> 
                                </td>
                                <td> 
                                    <Button variant="outline-danger" onClick={()=> deletePublisher(pub.pub_id,pub.name)}> 
                                        <MdDelete size={20} /> 
                                    </Button> 
                                </td>
                                </tr>
                                ) }
                            
                            </tbody>
                            </Table>
                        </Col>
                    </Row> 
        </>
    )
}

export default Publishers   
