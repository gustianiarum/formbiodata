import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Welcome extends Component {
  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1>Halo! Selamat Datang di Website Pusat Data Organisasi</h1>
        <p>
          Halaman website ini milik Badan Keluarga Mahasiswa Fakultas Matematika
          dan Ilmu Pengetahuan Alam Universitas Padjadjaran
        </p>
      </Jumbotron>
    );
  }
}
