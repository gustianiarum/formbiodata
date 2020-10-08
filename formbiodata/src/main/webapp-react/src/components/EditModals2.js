import React, { Component } from "react";
import { Modal, Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import { FaCalendarAlt, FaRegWindowClose } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import MyToast from "./MyToast";
import axios from "axios";

export default class EditModals2 extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    // this.biodataChange = this.biodataChange.bind(this);
  }

  initialState = {
    idPerson: "",
    status: "",
    message: "",
    nik: "",
    name: "",
    address: "",
    hp: "",
    tgl: "",
    tempatLahir: "",
  };

  //   componentDidUpdate() {
  //     this.updateBiodata();
  //   }

  updateBiodata = (event) => {
    event.preventDefault();

    const biodata = {
      idPerson: event.target.idPerson.value,
      nik: event.target.nik.value,
      name: event.target.name.value,
      address: event.target.address.value,
      hp: event.target.hp.value,
      tgl: event.target.tgl.value,
      tempatLahir: event.target.tempatLahir.value,
    };

    console.log(biodata);
    axios
      .put("http://localhost:8081/person/" + biodata.idPerson, biodata)
      .then((response) => {
        if (response.data != null) {
          // console.log(response.data);
          this.setState({
            show: true,
            status: response.data.status,
            message: response.data.message,
          });
          setTimeout(() => this.setState({ show: true }), 3000);
          // setTimeout(() => this.tableBiodata(), 3000)
        } else {
          this.setState({ show: false });
        }
      });
    // this.setState(this.initialState);
  };

  // tableBiodata = () => {
  //     return this.props.history.push("/data");
  // };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={this.state.status + ": " + this.state.message}
            type={"success"}
          />
        </div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              UPDATE BIODATA
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="formBiodata" onSubmit={this.updateBiodata}>
              <Row>
                <Col>
                  <Form.Control name="idPerson" value={this.props.id} hidden />
                  <Form.Group controlId="formGridNik">
                    <Form.Label>NIK:</Form.Label>
                    <Form.Control
                      required
                      style={{ fontSize: "20px" }}
                      autoComplete="off"
                      type="text"
                      name="nik"
                      defaultValue={this.props.nik}
                      placeholder="Masukkan nomor NIK"
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridName">
                    <Form.Label>Nama:</Form.Label>
                    <Form.Control
                      required
                      style={{ fontSize: "20px" }}
                      autoComplete="off"
                      type="text"
                      name="name"
                      defaultValue={this.props.name}
                      placeholder="Masukkan nama"
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridAddress">
                    <Form.Label>Alamat:</Form.Label>
                    <Form.Control
                      required
                      style={{ fontSize: "20px" }}
                      autoComplete="off"
                      type="text"
                      name="address"
                      defaultValue={this.props.address}
                      placeholder="Masukkan alamat"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGridHp">
                    <Form.Label>HP:</Form.Label>
                    <Form.Control
                      required
                      style={{ fontSize: "20px" }}
                      autoComplete="off"
                      type="text"
                      name="hp"
                      defaultValue={this.props.hp}
                      placeholder="Masukkan nomor HP"
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridTgl">
                    <Form.Label>Tanggal Lahir:</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <FaCalendarAlt />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        style={{ fontSize: "20px" }}
                        autoComplete="off"
                        type="date"
                        name="tgl"
                        defaultValue={this.props.tgl}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group controlId="formGridTempatLahir">
                    <Form.Label>Tempat Lahir:</Form.Label>
                    <Form.Control
                      required
                      style={{ fontSize: "20px" }}
                      autoComplete="off"
                      type="text"
                      name="tempatLahir"
                      defaultValue={this.props.tempat}
                      placeholder="Masukkan tempat lahir"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row style={{ textAlign: "center" }}>
                <Col>
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: "#31251C",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    type="submit"
                    onClick={this.props.onHide}
                  >
                    <IoIosSave />
                    Update
                  </Button>{" "}
                </Col>
                <Col>
                  on
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: "#77212E",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    onClick={this.props.onHide}
                  >
                    <FaRegWindowClose /> Close
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
