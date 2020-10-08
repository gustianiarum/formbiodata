import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import axios from "axios";

export default class DataTabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullbiodatas: [],
    };
  }

  componentDidMount() {
    this.findBiodataCompleted();
  }

  findBiodataCompleted() {
    axios
      .get("http://localhost:8081/person/pendidikan")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ fullbiodatas: data });

        console.log(data);
      });
  }
  render() {
    const columns = [
      {
        name: "nik",
        label: "NIK",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name",
        label: "NAMA LENGKAP",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "address",
        label: "ALAMAT",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "hp",
        label: "NOMOR HANDPHONE",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "tempatLahir",
        label: "Tempat Lahir",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "tgl",
        label: "TANGGAL LAHIR",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "umur",
        label: "UMUR",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "pendidikan_terakhir",
        label: "Pendidikan Terakhir",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "",
        label: "AKSI",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return <button>Edit</button>;
          },
        },
      },
    ];

    const datapend = this.state.fullbiodatas;

    return (
      <div>
        <div className="container">
          <MUIDataTable title={"Biodata"} data={datapend} columns={columns} />;
        </div>
      </div>
    );
  }
}
