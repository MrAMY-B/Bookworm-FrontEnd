import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, NavDropdown, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

function AllGenre() {

    const [genres,setGenres] = useState([]);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    

    useEffect(()=>{
        fetch('https://amol-bookworm-api.herokuapp.com/genre/all')
        .then(res=> res.json() )
        .then(res => {setGenres(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[showSuccessAlert])
        
    
    let deleteChategory = (id,gen)=>{
        let password = prompt("Enter your password to delete "+gen+" !");
        console.log(password)


        if(!password){
            console.log("Not deleting");
        }
        else if( password === 'AMOL' ){
            
        fetch('https://amol-bookworm-api.herokuapp.com/genre/genre/'+id,{ method:"DELETE" })
        .then(res => { 
            console.log('deletd...'+gen,res);
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
           <Row className="justify-content-center  p-4">

                <Col md={10}  className=" justify-content-center rounded  bg-light pt-4 pb-5 border rounded   shadow-lg">
                    <Alert variant={'danger'} show={showDangerAlert} onClose={() => setShowDangerAlert(false)} dismissible> Failed to delete genre </Alert>
                    <Alert variant={'success'} show={showSuccessAlert} onClose={() => setShowSuccessAlert(false)} dismissible> Genre deleted </Alert>
                
                    <h1 className="text-center text-success">Genre List</h1>
                        <NavDropdown.Divider />
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Genre Id</th>
                            <th>Genre</th>
                            <th>Update</th>
                            <th>Remove</th>
                            </tr> 
                        </thead>
                        <tbody> 
        
                            { genres.map( (genre,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{genre.gen_id}</td>
                            <td>{genre.genre}</td>
                                 <td> <Link to={'/admin/update-genre/'+genre.gen_id}><Button variant="outline-secondary"> <FiEdit size={20} /> </Button></Link> </td>
                            <td> <Button variant="outline-danger" onClick={()=> deleteChategory(genre.gen_id,genre.genre)}> <MdDelete size={20} /> </Button> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>
                    </Col>
                </Row> 
        </>
    )
}

export default AllGenre
