import React, { useState } from 'react'
import { Col, Form, NavDropdown, Row, Button, } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom'
import AlertComponent from '../../UtilComponents/AlertComponent';
import { API } from '../../UtilComponents/API';

function UploadProductImage() {

    let { prod_id } = useParams('prod_id');
    const history = useHistory();
    const [msg, setMsg] = useState('')
    const [pTmage, setPImage] = useState(null)
    const [pFile, setPFile] = useState(null)

    const getImage = (e) => {
        console.log(e.target.files);


        if (e.target.files[0]?.size < 614400 && (e.target.files[0]?.type==='image/png' || e.target.files[0]?.type==='image/jpeg')) {
            setMsg('');
            setPImage(e.target.files[0]);
        } else {
            setPImage(null)
            setMsg(<small className="text-danger">Image should be jpg/png/jpeg and size&lt;500kb</small>);
        }


    }

    const getFile = (e) => {
        console.log(e.target.files);

        //Cheacking file size is less then 600 kb
        if (e.target.files[0]?.size < 10485760 && (e.target.files[0]?.type==='application/pdf' || e.target.files[0]?.type==='audio/mp3')) {
            setMsg('');
            setPFile(e.target.files[0]);
        } else {
            setPFile(null)
            setMsg(<small className="text-danger">File should be PSF/docx/mp3 and size&lt;10MB</small>);
        }



    }
    const handleSubmit = () => {
        if (pTmage !== null && pFile !== null) {

            let formData = new FormData();
            formData.append('image', pTmage);
            formData.append('file', pFile);


            console.log('Sending Files -----> -> ->');

            // fetch(API+'/upload-files/'+prod_id, {method:"POST",headers:{'Content-Type': 'multipart/form-data; boundary=aaaaaaaaaaaaaaaaaaa'},body:formData} )
            fetch(API + '/upload-files/' + prod_id, { method: "POST", body: formData })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.length === 2) {
                        setMsg(<AlertComponent type="success" msg={'Files Added Successfully....'} />);
                        setTimeout(() => { history.push('/admin/add-authors-to-product/' + prod_id) }, 2000)
                    } else
                        setMsg(<AlertComponent type="danger" msg={'Something went wrong....'} />);

                })
                .catch(err => console.log(err))

        }
    }

    return (
        <Row className="justify-content-center  py-4 px-md-4 px-2">
            <Col md={8} sm={10} xs={11} className="justify-content-center rounded  bg-light pt-sm-4 pb-5 border rounded   shadow-lg">

                <h1 className="text-center text-success"> Upload Image and File </h1>
                <NavDropdown.Divider />
                <b>{msg}</b>
                <Row>

                    <Col>
                        <Form>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label><small>Product Front Image</small></Form.Label>
                                <Form.Control type="file" onChange={(e) => getImage(e)} />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label><small>Product File</small> </Form.Label>
                                <Form.Control type="file" onChange={(e) => getFile(e)} />
                            </Form.Group>
                        </Form>
                        {/* { !pTmage ? null :  <Image src={pTmage} />  } */}
                    </Col>
                    <p><br /><b> <small>Note : Image size &lt; 500 KB, File Size &lt; 10MB </small> </b></p>
                </Row>


                <div className="mt-4 d-grid">
                    <Button variant="outline-success" onClick={() => handleSubmit()} type="submit" size="lg" >Upload Files</Button>
                </div>
                <hr />
                <Link to={"/admin/add-authors-to-product/"+prod_id} >Skip file uploading</Link>
            </Col>
        </Row>
    )
}

export default UploadProductImage
