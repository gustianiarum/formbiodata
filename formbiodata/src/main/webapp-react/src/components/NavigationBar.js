import React, { Component } from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={""} className="navbar-brand">
          Database
        </Link>
        <Nav className="mr-auto">
          <Link to={"addbio"} className="nav-link">
            Form Biodata
          </Link>
          <Link to={"list"} className="nav-link">
            Tabel Biodata
          </Link>
          <Link to={"addpendidikan"} className="nav-link">
            Form Pendidikan
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
