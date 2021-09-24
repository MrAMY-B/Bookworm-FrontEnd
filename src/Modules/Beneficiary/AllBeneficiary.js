import React, { useEffect, useState } from 'react'
import { Button, Col, NavDropdown, Row, Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDelete, MdOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

function AllBeneficiary() { 
    
    const [users,setUsers] = useState([]);
    const [resp,setResp ] = useState()

    
 
    useEffect(()=>{
        fetch(API+'/beneficiary/all')
        .then(res=> res.json() )
        .then(res => {setUsers(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[resp])
        
    
    let deleteUser = (id,name)=>{
        let password = prompt("Enter your password to delete "+id+", "+name+" !");
        console.log(password)


        if(!password){
            console.log("Not deleting");
            
        }
        else if( password === 'AMOL' ){
            
        fetch(API+'/beneficiary/'+id,{ method:"DELETE" })
        .then(res => { 
            console.log('deletd...'+name,res);
            setResp(<AlertComponent type="success" msg={`User ${name} is deleted...`}/>)
            
        })
        .catch(err=> {
            console.log(err)
            setResp(<AlertComponent type="warning" msg={`User ${name} is deleted...`}/>)
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
                    <h1 className="text-center text-success">Beneficiary List</h1>
                        <NavDropdown.Divider />
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Ban_Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>See</th>
                            <th>Delete</th>
                            </tr> 
                        </thead>
                        <tbody> 
        
                            { users.map( (user,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{user.ban_id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                                 <td> <Link to={'/admin/beneficiary/'+user.ban_id}><Button variant="outline-success"><MdOpenInNew />  </Button> </Link> </td>
                                
                                 <td> <Link to={'/admin/update-beneficiary/'+user.ban_id}><Button variant="outline-secondary"><FiEdit size={20} />  </Button> </Link> </td>
                            <td> <Button variant="outline-danger" onClick={()=> deleteUser(user.ban_id,user.name)}> <MdDelete size={20} /> </Button> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>
                    </Col>
                </Row> 
        </>
    )
}


export default AllBeneficiary
