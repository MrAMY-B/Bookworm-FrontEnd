import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, NavDropdown, Row, Table } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

function AllCategroies() {

    const [categories,setCategories] = useState([]);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/category/all')
        .then(res=> res.json() )
        .then(res => {setCategories(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[showSuccessAlert])
        
    
    let deleteChategory = (id,cate)=>{
        let password = prompt("Enter your password to delete "+cate+" !");
        console.log(password)


        if(!password){
            console.log("Not deleting");
        }
        else if( password === 'AMOL' ){
            
        fetch('https://amol-bookworm-api.herokuapp.com/category/'+id,{ method:"DELETE" })
        .then(res => { 
            console.log('deletd...'+cate,res);
            setShowDangerAlert(false)
            setShowSuccessAlert(true);
        })
        .catch(err=> {
            console.log(err)
            setShowSuccessAlert(false)
            setShowDangerAlert(true)
        })

           
        }
        else{
            setShowSuccessAlert(false)
            setShowDangerAlert(true)
        }
    }

    return (
        <>
           <Row className="justify-content-center  p-sm-4">

                <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                    <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Failed to Add </Alert>
                    <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Successfully Added </Alert>
                
                    <h1 className="text-center text-success">Category List</h1>
                        <NavDropdown.Divider />
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Category Id</th>
                            <th>Category</th>
                            <th>Update</th>
                            <th>Remove</th>
                            </tr> 
                        </thead>
                        <tbody> 
        
                            { categories.map( (cate,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{cate.cate_id}</td>
                            <td>{cate.category}</td>
                            <td> <Link to={'/admin/update-category/'+cate.cate_id}><Button variant="outline-secondary"><FiEdit size={20} /></Button></Link> </td>
                            <td> <Button variant="outline-danger" onClick={()=> deleteChategory(cate.cate_id,cate.category)}> <MdDelete size={20} /> </Button> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>
                    </Col>
                </Row> 
        </>
    )
}

export default AllCategroies
