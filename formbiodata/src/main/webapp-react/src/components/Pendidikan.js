import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  button: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
}));
function Pendidikan() {
  const classes = useStyles();
  const { idPerson } = useParams();

  const [inputFields, setInputField] = useState([
    { institusi: "", jenjang: "", lulus: "", masuk: "" },
  ]);

  // const [idPerson, setIdPerson] = useState();

  const handleChangeInput = (idPendidikan, event) => {
    const values = [...inputFields];
    values[idPendidikan][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
    console.log(idPerson);

    axios
      .post("http://localhost:8081/pendidikan/person/" + idPerson, inputFields)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleAddFields = () => {
    setInputField([
      ...inputFields,
      { institusi: "", jenjang: "", lulus: "", masuk: "" },
    ]);
  };

  const handleRemoveFields = (idPendidikan) => {
    const values = [...inputFields];
    values.splice(idPendidikan, 1);
    setInputField(values);
  };
  // const [posts, setPosts] = useState([]);

  return (
    <Container className={"bg-white"}>
      <h1 className={"text-blue"}>Tambah Pendidikan</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <input
          type="text"
          value={idPerson}
          disabled
          // onChange={(e) => setIdPerson(e.target.value)}
        />
        {inputFields.map((inputField, idPendidikan) => (
          <div key={idPendidikan}>
            <TextField
              name="institusi"
              label="Institusi Pendidikan"
              variant="filled"
              value={inputField.institusi}
              onChange={(event) => handleChangeInput(idPendidikan, event)}
            />
            <TextField
              name="jenjang"
              label="Jenjang Pendidikan"
              variant="filled"
              value={inputField.jenjang}
              onChange={(event) => handleChangeInput(idPendidikan, event)}
            />
            <TextField
              name="masuk"
              label="Tahun Masuk"
              variant="filled"
              value={inputField.masuk}
              onChange={(event) => handleChangeInput(idPendidikan, event)}
            />
            <TextField
              name="lulus"
              label="Tahun Lulus"
              variant="filled"
              value={inputField.lulus}
              onChange={(event) => handleChangeInput(idPendidikan, event)}
            />
            <IconButton onClick={() => handleRemoveFields()}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => handleAddFields()}>
              <AddIcon />
            </IconButton>
          </div>
        ))}
        <Button
          className="classes.button"
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </form>
      <br></br>
    </Container>
  );
}
export default Pendidikan;
