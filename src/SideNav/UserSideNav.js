import {  Collapse, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

function UserSideNav() {
    const [openAccOp, setOpenAccOp] = useState(false);
    const [openShelf, setOpenShelf] = useState(false);

    return (
        <>


                <h4 className="text-success">
                    My Profile
                </h4>
                <hr />
          
            <Nav>
                    <div>
                        <Nav.Link>
                            <h6 onClick={() => setOpenAccOp(!openAccOp)} aria-controls="UserAccount">
                                <MdArrowDropDown/> My Account
                            </h6>
                        </Nav.Link>
                        <Collapse in={openAccOp}>
                                <ul className="list-group  list-group-flush" id="UserAccount">
                                    <li className="list-group-item"><Link to="/usere/my-profile">My Profile</Link>  </li>
                                    <li className="list-group-item"><Link to="/usere/update-my-profile">Update Profile</Link>  </li>
                                    <li className="list-group-item"><Link to="/admin/add-category/"> Change Image </Link> </li>
                                </ul>
                        </Collapse>
                    </div>
                

                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenShelf(!openShelf)} aria-controls="UserShelf">
                            <MdArrowDropDown/> My Shelf
                        </h6>
                    </Nav.Link>
                    <Collapse in={openShelf}>
                            <ul className="list-group  list-group-flush" id="UserShelf">
                                <li className="list-group-item"><Link to="/usere/update-my-profile">Update Profile</Link>  </li>
                                <li className="list-group-item"><Link to="/admin/add-category/"> Change Image </Link> </li>
                                <li className="list-group-item"><Link to="/usere/update-my-profile">Update Profile</Link>  </li>
                                <li className="list-group-item"><Link to="/admin/add-category/"> Change Image </Link> </li>
                            </ul>
                    </Collapse>
                </div>
                

                <Nav.Link>
                    
                </Nav.Link>

                <Nav.Link>
                    
                </Nav.Link>
            </Nav>
                
           
                
        </>
    )
}
export default UserSideNav
