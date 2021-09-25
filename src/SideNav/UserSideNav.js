import { Collapse, Nav, Badge } from 'react-bootstrap'
import React, { useState } from 'react'
import { MdArrowDropDown, MdOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { API } from '../UtilComponents/API';

function UserSideNav() {
    
    let u_id = 2;
    const [openAccOp, setOpenAccOp] = useState(false);
    const [openShelf, setOpenShelf] = useState(false);
    const [myShelf, setMyShelf] = useState([]);

    const [P, setP] = useState(0);
    const [L, setL] = useState(0);
    const [R, setR] = useState(0);


    useEffect(() => {

        fetch(API + '/shelf/user/'+u_id)
            .then(res => res.json())
            .then(res => {
                setMyShelf(res);
                setP(res.filter(s => s.tr_type === 'PURCHASED').length);
                setR(res.filter(s => s.tr_type === 'RENTED').length)
                setL(res.filter(s => s.tr_type === 'LENTED').length)
            })
            .catch(err => console.log(err))


    }, [u_id])

    return (
        <>


            <h4 className="text-success" >
                <Link to="/user/my-profile" className="text-success">MY PROFILE</Link>
            </h4>
            <hr />

            <Nav style={{ display: 'block' }}>
                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenAccOp(!openAccOp)} aria-controls="UserAccount">
                            <MdArrowDropDown /> My Account
                        </h6>
                    </Nav.Link>
                    <Collapse in={openAccOp}>
                        <ul className="list-group-flush" id="UserAccount">
                            <li className="list-group-item"><Link to="/user/my-profile">My Profile</Link>  </li>
                            <li className="list-group-item"><Link to="/user/update-my-profile">Edit Profile</Link>  </li>
                        </ul>
                    </Collapse>
                </div>


                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenShelf(!openShelf)} aria-controls="UserShelf">
                            <MdArrowDropDown /> My Shelf
                        </h6>
                    </Nav.Link>
                    <Collapse in={openShelf}>
                        <ul className="list-group-flush" id="UserShelf">
                            {myShelf?.length === 0 ? <li className="list-group-item">No transaction </li> :
                                <>
                                    <li className="list-group-item">
                                        Purchased &nbsp;&nbsp;&nbsp;
                                        <Badge pill bg="primary" > {P} </Badge>

                                    </li>
                                    <li className="list-group-item">
                                        Rented &nbsp;&nbsp;&nbsp;
                                        <Badge pill bg="primary">{R}</Badge>
                                    </li>
                                    <li className="list-group-item">
                                        Lented &nbsp;&nbsp;&nbsp;
                                        <Badge pill bg="primary">{L} </Badge>
                                    </li>
                                    <li className="list-group-item"><Link to="/user/my-shelf">See All</Link>  </li>
                                </>
                            }

                        </ul>
                    </Collapse>
                </div>
                <hr className="my-0" />
                <div>
                    <Nav.Link as={Link} to={'/user/generate-invoice/'+u_id} >
                        <h6 >
                            <MdOpenInNew /> Generate Invoice
                        </h6>
                    </Nav.Link>
                </div>
                <hr className="my-0" />
                <div>
                    <Nav.Link as={Link} to={'/library-package/'} >
                        <h6 >
                            <MdOpenInNew /> Library Package
                        </h6>
                    </Nav.Link>
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

