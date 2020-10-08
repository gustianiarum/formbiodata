import React, { Component } from "react";
import { Card, Table, Button, ButtonToolbar } from "react-bootstrap";
import EditModals2 from "./EditModals2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import MyToast from "./MyToast";
import { Link } from "react-router-dom";

export default class BiodataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biodatas: [],
    };
  }

  componentDidMount() {
    this.findAllBiodatas();
  }
  componentDidUpdate() {
    this.findAllBiodatas();
  }

  findAllBiodatas() {
    axios
      .get("http://localhost:8081/person")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ biodatas: data });
      });
  }

  deleteBiodata = (biodataIdPerson) => {
    axios
      .delete("http://localhost:8081/person/delete/" + biodataIdPerson)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            biodatas: this.state.biodatas.filter(
              (biodata) => biodata.idPerson !== biodataIdPerson
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    const {
      sendId,
      sendNik,
      sendName,
      sendAddress,
      sendHp,
      sendTgl,
      sendTempat,
    } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Biodata deleted"}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Biodata List
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>NIK</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Nomor Handphone</th>
                  <th>Tanggal Lahir</th>
                  <th>Tempat Lahir</th>
                  <th>Aksi</th>
                  <th>Tambah Pendidikan</th>
                </tr>
              </thead>
              <tbody>
                {this.state.biodatas.length === 0 ? (
                  <tr align="center">
                    <td colSpan="10">{this.state.biodatas.length}</td>
                  </tr>
                ) : (
                  this.state.biodatas.map((biodata) => (
                    <tr key={biodata.idPerson}>
                      <td>{biodata.nik}</td>
                      <td>{biodata.name}</td>
                      <td>{biodata.address}</td>
                      <td>{biodata.hp}</td>
                      <td>{biodata.tgl}</td>
                      <td>{biodata.tempatLahir}</td>
                      <td>
                        <ButtonToolbar>
                          <Button
                            className="outline-primary"
                            size="sm"
                            onClick={() =>
                              this.setState({
                                addModalShow: true,
                                sendId: biodata.idPerson,
                                sendNik: biodata.nik,
                                sendName: biodata.name,
                                sendAddress: biodata.address,
                                sendHp: biodata.hp,
                                sendTgl: biodata.tgl,
                                sendTempat: biodata.tempatLahir,
                              })
                            }
                          >
                            <FaEdit />
                          </Button>

                          <EditModals2
                            show={this.state.addModalShow}
                            onHide={addModalClose}
                            id={sendId}
                            nik={sendNik}
                            name={sendName}
                            address={sendAddress}
                            hp={sendHp}
                            tgl={sendTgl}
                            tempat={sendTempat}
                          />

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={this.deleteBiodata.bind(
                              this,
                              biodata.idPerson
                            )}
                          >
                            <FaTrashAlt />
                          </Button>
                        </ButtonToolbar>
                      </td>
                      <td>
                        <Link
                          to={"addPendidikan/" + biodata.idPerson}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>{" "}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
