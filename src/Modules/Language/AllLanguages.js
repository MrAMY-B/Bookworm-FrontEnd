import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, NavDropdown, Row, Table } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

function AllLanguages() {

    const [languages,setlanguages] = useState([]);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/language/all')
        .then(res=> res.json() )
        .then(res => {setlanguages(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[showSuccessAlert])
        
    
    let deleteChategory = (id,lang)=>{
        let password = prompt("Enter your password to delete "+lang+" !");
        console.log(password)


        if(!password){
            console.log("Not deleting");
        }
        else if( password === 'AMOL' ){
            
        fetch('https://amol-bookworm-api.herokuapp.com/language/'+id,{ method:"DELETE" })
        .then(res => { 
            console.log('deletd...'+lang,res);
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
                    <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Failed to delete language </Alert>
                    <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Language deleted </Alert>
                
                    <h1 className="text-center text-success">Languages List</h1>
                        <NavDropdown.Divider />
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Language Id</th>
                            <th>Language</th>
                            <th>Update</th>
                            <th>Remove</th>
                            </tr> 
                        </thead>
                        <tbody> 
        
                            { languages.map( (lang,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{lang.lang_id}</td>
                            <td>{lang.language}</td>
                            <td> <Link to={'/admin/update-language/'+lang.lang_id}><Button variant="outline-secondary"><FiEdit size={20} /></Button></Link> </td>
                            <td> <Button variant="outline-danger" onClick={()=> deleteChategory(lang.lang_id,lang.language)}> <MdDelete size={20} /> </Button> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>
                    </Col>
                </Row> 
        </>
    )
}

export default AllLanguages
