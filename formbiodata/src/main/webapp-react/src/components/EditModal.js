import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditModal extends Component{
    constructor(props){
        super(props);
        this.state={snackbaropen:false, snackbarmsg: ''};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    snackbarClose=(event)=>{
        this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:8081/person/update/'+idPerson ,{method:'PUT',headers:{
            'Accept': 'application/json'.,
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            idPerson: null,
            name: event.target.name.value,
            nik: event.target.nik.value,
            address:event.target.address.value,
            tempatLahir: event.target.tempatLahir.value,
            tgl: event.target.tgl.value,
            hp: event.target.hp.value
        })
    })
    .then(res=>res.json())
    .then((result)=>{
        this.setState({snackbaropen: true, snackbarmsg:result});
    },
    (error)=>{
        this.setState({snackbaropen:true,snackbarmsg:'failed'});
    }
    )
    }
    render(){
        return(
            <div className="container">
                <<Snackbar anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open={this.state.snackbaropen}
                autoHideDuration={3000}
                onClose={this.snackbarClose}

                message={<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[<IconButton key="close" arial-label="Close" color="inherit" onClick={this.snackbarClose}>x</IconButton>]}/>
                
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                center>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Biodata
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={16}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="nik">
                                        <Form.Label>NIK :</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="nik"
                                        required
                                        placeholder="Masukkan nik"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="name">
                                        <Form.Label>Nama :</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Masukkan nama"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>Alamat :</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="address"
                                        required
                                        placeholder="Masukkan Alamat"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="tempatLahir">
                                        <Form.Label>Masukkan Tempat Lahir: </Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="tempatLahir"
                                        required
                                        placeholder="Masukkan Tempat Lahir"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="tgl">
                                        <Form.Label>Masukkan Tanggal Lahir: </Form.Label>
                                        <Form.Control
                                        type="date"
                                        name="tgl"
                                        required
                                        placeholder="Masukkan Tanggal Lahir"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="hp">
                                        <Form.Label>Masukkan Nomor Handphone: </Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="hp"
                                        required
                                        placeholder="Masukkan nomor handphone"
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}