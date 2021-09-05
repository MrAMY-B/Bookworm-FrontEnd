import {  Collapse, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

function AdminSideNav() {
    const [openC, setOpenC] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [openG, setOpenG] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [openU, setOpenU] = useState(false);


    return (
        <>


                <h4 className="text-success">
                    ADMIN PANEL
                </h4>
                <hr />

                <Nav>
                        <div className="d-block">
                            <Nav.Link>
                                <h6 onClick={() => setOpenC(!openC)} aria-controls="example-collapse-text">
                                    <MdArrowDropDown/> Category
                                </h6>
                            </Nav.Link>
                            <Collapse in={openC}>
                                    <ul className="list-group  list-group-flush" id="example-collapse-text">
                                        <li className="list-group-item"> 
                                            <Link to="/admin/categories">See Categories</Link> 
                                        </li>
                                        <li className="list-group-item"><Link to="/admin/add-category/"> Add Category </Link> </li>
                                    </ul>
                            </Collapse>
                        </div>
                    

                        <div>
                            <Nav.Link>
                                <h6 onClick={() => setOpenL(!openL)} aria-controls="example-collapse-text">
                                    <MdArrowDropDown/> Language
                                </h6>
                            </Nav.Link>
                            <Collapse in={openL}>
                                    <ul className="list-group  list-group-flush" id="example-collapse-text">
                                        <li className="list-group-item" ><Link to="/admin/languages" >See Languages</Link></li>
                                        <li className="list-group-item"><Link to="/admin/add-language">Add Language</Link></li>
                                    </ul>
                            </Collapse>
                        </div>
                    

                        <div>
                            <Nav.Link>
                                <h6 onClick={() => setOpenG(!openG)} aria-controls="example-collapse-text">
                                    <MdArrowDropDown/> Genre
                                </h6>
                            </Nav.Link>
                            <Collapse in={openG}>
                                    <ul className="list-group  list-group-flush" id="example-collapse-text">
                                    <li className="list-group-item" ><Link to="/admin/genres" >See Genre</Link></li>
                                        <li className="list-group-item"><Link to="/admin/add-genre">Add Genre</Link></li>
                                    </ul>
                            </Collapse>
                        </div>
                    

                        <div>
                            <Nav.Link>
                                <h6 onClick={() => setOpenP(!openP)} aria-controls="example-collapse-text">
                                    <MdArrowDropDown/> Product
                                </h6>
                            </Nav.Link>
                            <Collapse in={openP}>
                                    <ul className="list-group  list-group-flush" id="example-collapse-text">
                                        <li className="list-group-item"><Link to="/admin/products" >See Products</Link></li>
                                        <li className="list-group-item"><Link to="/admin/add-product" >Add Product</Link> </li>
                                    </ul>
                            </Collapse>
                        </div>
                    
                        <div>
                            <Nav.Link>
                                <h6 onClick={() => setOpenU(!openU)} aria-controls="example-collapse-text">
                                    <MdArrowDropDown/> Users
                                </h6>
                            </Nav.Link>
                            <Collapse in={openU}>
                                    <ul className="list-group  list-group-flush" id="example-collapse-text">
                                        <li className="list-group-item"><Link to="/admin/users" >See Users</Link></li>
                                    </ul>
                            </Collapse>
                        </div>
                    

                    <Nav.Link>
                        
                    </Nav.Link>
                </Nav>
          
           
                
        </>
    )
}

export default AdminSideNav
