import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Col, NavDropdown,Button, Row, Table,Tabs,Tab, Image } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { API } from '../../UtilComponents/API';

function MyShelf() {

    let u_id = 2;
    const [shelfs, setShelfs] = useState([]);
    const [P , setP ] = useState(0);
    const [L , setL ] = useState(0);
    const [R , setR ] = useState(0);

    
    

    useEffect(() => {
        fetch(API+'/shelf/user/'+u_id)
        .then(res=>res.json())
        .then(res=>{ 
            setShelfs(res);
            setP(res.filter( s=>s.tr_type==='PURCHASED' ).length);
            setR(res.filter( s=>s.tr_type==='RENTED' ).length)
            setL(res.filter( s=>s.tr_type==='LENTED' ).length)
        })
        .catch(err=>console.log(err))

    }, [u_id])

   


    
    return (
        <>
           <Row className="justify-content-center  p-sm-4">

            <Col md={10}  className="justify-content-center rounded  bg-light pt-4 pb-5 border shadow-lg">
            <h1 className="text-center text-success">My Shelf</h1>
            <NavDropdown.Divider />
            <Tabs defaultActiveKey={1} transition={true} className="mb-3">
                <Tab eventKey="1" title={'PURCHASED : ' +P}>
                     {/* ============PURCHASED============ */}
                     <h3>Purchased Products</h3>
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Visit</th>
                            </tr> 
                        </thead>
                        <tbody> 
                            { shelfs?.filter(s=>s.tr_type==='PURCHASED').map( (s,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td><Image src="https://picsum.photos/200/150"  width="50"/>{s.product?.front_image_link}</td>
                            <td>{s.product?.title}</td>
                            <td> <Link to={'XXXXX/'+s.product?.prod_id}><Button variant="outline-secondary"><FiEdit size={20} /></Button></Link> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>

                </Tab>
                <Tab eventKey="2" title={'RENTED : '+R }>
                     {/* ============RENTED============ */}
                     <h3>Rented Products</h3>
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Validity</th>
                            <th>Visit</th>
                            </tr> 
                        </thead>
                        <tbody> 
                            { shelfs?.filter(s=>s.tr_type==='RENTED').map( (s,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td><Image src="https://picsum.photos/200/150"  width="50"/>{s.product?.front_image_link}</td>
                            <td>{s.product?.title}</td>
                            <td>{s.prod_expiry}</td>
                            <td> <Link to={'XXXXX/'+s.product?.prod_id}><Button variant="outline-secondary"><FiEdit size={20} /></Button></Link> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>

                </Tab>
                <Tab eventKey="3" title={'LENTED : '+L} >
                    {/* ============RENTED============ */}
                    <h3>Lented Products</h3>
                    <Table bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                            <th>No.</th>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Valid</th>
                            <th>Visit</th>
                            </tr> 
                        </thead>
                        <tbody> 
                            { shelfs?.filter(s=>s.tr_type==='LENTED').map( (s,i)=> 
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td><Image src="https://picsum.photos/200/150"  width="50"/>{s.product?.front_image_link}</td>
                            <td>{s.product?.title}</td>
                            <td>{s.prod_expiry}</td>
                            <td> <Link to={'XXXXX/'+s.product?.prod_id}><Button variant="outline-secondary"><FiEdit size={20} /></Button></Link> </td>
                            </tr>
                            ) }
                        
                        </tbody>
                        </Table>

                </Tab>
                </Tabs>
                
               
                        
                        
                    </Col>
                </Row> 
        </>
    )
}

export default MyShelf
