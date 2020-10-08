import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import BiodataList from "./components/Biodata.List";
import Biodata from "./components/Biodata";
import DataTabel from "./components/DataTabel";
import Pendidikan from "./components/Pendidikan";

function App() {
  const marginTop = {
    marginTop: "20px",
  };
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/addbio" exact component={Biodata} />
              <Route path="/tabelbio" exact component={DataTabel} />
              <Route path="/edit/:idPerson" exact component={Biodata} />
              <Route path="/list" exact component={BiodataList} />
              <Route
                path="/addpendidikan/:idPerson"
                exact
                component={Pendidikan}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
