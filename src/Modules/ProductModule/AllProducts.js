import React, { useEffect, useState } from 'react'
import { Button, Col, NavDropdown, Row, Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDelete, MdOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

function AllProducts() {

    const [products,setProducts] = useState([]);
    const [resp,setResp ] = useState()

    
 
    useEffect(()=>{
        fetch(API+'/product/all')
        .then(res=> res.json() )
        .then(res => {setProducts(res); console.log('req-->')})
        .catch(err=> console.log(err))
        },[resp])
        
    
    let deleteProduct = (id,name)=>{
        let password = prompt("Enter your password to delete "+id+", "+name+" !");
        console.log(password)


        if(!password){
            console.log("Not deleting");
            
        }
        else if( password === 'AMOL' ){
            
        fetch(API+'/product/'+id,{ method:"DELETE" })
        .then(res => { 
            console.log('deletd...'+name,res);
            setResp(<AlertComponent type="success" msg={`Product ${name} is deleted...`}/>)
            
        })
        .catch(err=> {
            console.log(err)
            setResp(<AlertComponent type="warning" msg={`Product ${name} is deleted...`}/>)
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
                        <h1 className="text-center text-success">Product List</h1>
                            <NavDropdown.Divider />
                        <Table bordered hover responsive className="text-center">
                            <thead>
                                <tr>
                                <th>No.</th>
                                <th>Product Id</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Visit</th>
                                <th>Update</th>
                                <th>Delete</th>
                                </tr> 
                            </thead>
                            <tbody> 

                                { products?.length===0 ? 'Loading data...' :  products?.map( (prod,i)=> 
                                <tr key={i}>
                                <td> {i+1}  </td>
                                <td>{prod.prod_id}</td>
                                <td>{prod.title}</td>
                                <td>{prod.base_price}</td>
                                <td><Link to={"/products-description/"+prod.prod_id}><Button variant="outline-success"><MdOpenInNew />  </Button> </Link></td>
                                <td> <Link to={'/admin/update-product/'+prod.prod_id}>
                                        <Button variant="outline-secondary"> 
                                            <FiEdit size={20} />
                                        </Button></
                                    Link> 
                                </td>
                                <td> 
                                    <Button variant="outline-danger" onClick={()=> deleteProduct(prod.prod_id,prod.title_in_english)}> 
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

export default AllProducts