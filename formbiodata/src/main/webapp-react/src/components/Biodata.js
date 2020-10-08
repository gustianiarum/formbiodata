import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

export default class Biodata extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.biodataChange = this.biodataChange.bind(this);
    this.submitBiodata = this.submitBiodata.bind(this);
  }

  initialState = {
    idPerson: "",
    nik: "",
    nikError: "",
    name: "",
    address: "",
    tempatLahir: "",
    tgl: "",
    umurError: "",
    hp: "",
  };

  componentDidMount() {
    const biodataIdPerson = +this.props.match.params.idPerson;
    if (biodataIdPerson) {
      this.findBiodataByIdPerson(biodataIdPerson);
    }
  }

  findBiodataByIdPerson = (biodataIdPerson) => {
    axios
      .get("http://localhost:8081/person/" + biodataIdPerson)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            idPerson: response.data.idPerson,
            nik: response.data.nik,
            name: response.data.name,
            address: response.data.address,
            tempatLahir: response.data.tempatLahir,
            tgl: response.data.tgl,
            hp: response.data.hp,
          });
        }
      })
      .catch((error) => {
        console.error("Error -" + error);
      });
  };

  resetBiodata = () => {
    this.setState(() => this.initialState);
  };

  validate = () => {
    let { AgeFromDate } = require("age-calculator");

    let umur = new AgeFromDate(new Date(this.state.tgl)).age;

    if (this.state.nik.length !== 16) {
      this.setState({ nikError: "Jumlah nik tidak sama dengan 16" });
      return false;
    }
    if (umur < 30) {
      this.setState({ umurError: "Umur kurang dari 30 tahun" });
      return false;
    } else {
      return true;
    }
  };

  submitBiodata = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    console.log(isValid);
    if (isValid) {
      const biodata = {
        nik: this.state.nik,
        name: this.state.name,
        address: this.state.address,
        tempatLahir: this.state.tempatLahir,
        tgl: this.state.tgl,
        hp: this.state.hp,
      };

      axios.post("http://localhost:8081/person", biodata).then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
        } else {
          this.setState({ show: false });
        }
      });
      this.setState(this.initialState);
    }
  };

  biodataChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  biodataList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { nik, name, address, tempatLahir, tgl, hp } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Biodata saved"}
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            {" "}
            <FontAwesomeIcon
              icon={this.state.idPerson ? faEdit : faPlusSquare}
            />{" "}
            {this.state.idPerson ? "Update Biodata" : "Tambah Biodata"}
          </Card.Header>
          <Form
            onReset={this.resetBiodata}
            onSubmit={this.submitBiodata}
            id="biodataFormId"
          >
            <Card.Body>
              <Form.Group>
                <Form.Label controlid="nik">NIK : </Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="nik"
                  value={nik}
                  onChange={this.biodataChange}
                  placeholder="Masukkan nomor NIK"
                />

                {this.state.nikError ? (
                  <div style={{ color: "white" }}>{this.state.nikError}</div>
                ) : null}
              </Form.Group>

              <Form.Group controlid="name">
                <Form.Label>Nama : </Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.biodataChange}
                  placeholder="Masukkan nama"
                />
              </Form.Group>

              <Form.Group controlid="address">
                <Form.Label>Alamat: </Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.biodataChange}
                  placeholder="Masukkan alamat"
                />
              </Form.Group>

              <Form.Group controlid="tempatLahir">
                <Form.Label>Tempat Lahir </Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="tempatLahir"
                  value={tempatLahir}
                  onChange={this.biodataChange}
                  placeholder="Masukkan tempat lahir"
                />
              </Form.Group>

              <Form.Group controlid="tgl">
                <Form.Label>Tanggal Lahir </Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="date"
                  name="tgl"
                  value={tgl}
                  onChange={this.biodataChange}
                  placeholder="Masukkan tanggal lahir"
                />
                {this.state.umurError ? (
                  <div style={{ color: "white" }}>{this.state.umurError}</div>
                ) : null}
              </Form.Group>

              <Form.Group controlid="hp">
                <Form.Label>Nomor Handphone : </Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="hp"
                  value={hp}
                  onChange={this.biodataChange}
                  placeholder="Masukkan nomor handphone"
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.idPerson ? "Update" : "Save"}
              </Button>{" "}
              <Button variant="success" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                variant="success"
                type="button"
                onClick={this.biodataList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> Biodata List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
