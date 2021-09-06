import {  Collapse, Nav } from 'react-bootstrap'
import React, { useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

function DefaultSideNav() {
    const [openProdCate, setOpenProdCate] = useState(false);
    const [openProdLang, setOpenProdLang] = useState(false);
    const [openProdGen, setOpenProdGen] = useState(false);

    return (
        <>


                <h4 className="text-success text-center">
                    Quick Nav
                </h4>
                <hr />
          
            <Nav>
                    <div>
                        <Nav.Link>
                            <h6 onClick={() => setOpenProdCate(!openProdCate)} aria-controls="productCategory">
                                <MdArrowDropDown/> Product Category
                            </h6>
                        </Nav.Link>
                        <Collapse in={openProdCate}>
                                <ul className=" list-group-flush" id="productCategory">
                                    <li className="list-group-item"><Link to="/products-by-category/cate_id">E-Book</Link>  </li>
                                    <li className="list-group-item"><Link to="/products-by-category/cate_id">Audio Book</Link>  </li>
                                    <li className="list-group-item"><Link to="/products-by-category/cate_id"> Music </Link> </li>
                                </ul>
                        </Collapse>
                    </div>
                

                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenProdLang(!openProdLang)} aria-controls="productLang">
                            <MdArrowDropDown/> Product Language
                        </h6>
                    </Nav.Link>
                    <Collapse in={openProdLang}>
                            <ul className=" list-group-flush" id="productLang">
                                <li className="list-group-item"><Link to="/product-by-language/language">Hindi</Link>  </li>
                                <li className="list-group-item"><Link to="/product-by-language/language"> English </Link> </li>
                                <li className="list-group-item"><Link to="/product-by-language/language">Marathi</Link>  </li>
                                <li className="list-group-item"><Link to="/product-by-language/language"> Gujrati </Link> </li>
                            </ul>
                    </Collapse>
                </div>
                <div>
                    <Nav.Link>
                        <h6 onClick={() => setOpenProdGen(!openProdGen)} aria-controls="productGenre">
                            <MdArrowDropDown/> Product Genre
                        </h6>
                    </Nav.Link>
                    <Collapse in={openProdGen}>
                            <ul className=" list-group-flush" id="productGenre">
                                <li className="list-group-item"><Link to="/product-by-genre/genre">Novel</Link>  </li>
                                <li className="list-group-item"><Link to="/product-by-genre/genre"> History </Link> </li>
                                <li className="list-group-item"><Link to="/product-by-genre/genre">Sci-Fi</Link>  </li>
                                <li className="list-group-item"><Link to="/product-by-genre/genre"> Action </Link> </li>
                            </ul>
                    </Collapse>
                </div>
                

                <Nav.Link>
                    
                </Nav.Link>

               
            </Nav>
                
           
                
        </>
    )
}
export default DefaultSideNav
