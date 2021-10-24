import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const Register = (props) => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const changeHandler = (e) => {
    const newRegForm = {
      ...registerForm,
      [e.target.name]: e.target.value,
    };
    setRegisterForm(newRegForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // axios
    // .post("", registerForm)
    // .then((res) => {

    // })
    // .catch((err) => console.log(err.response.data))
    props.history.push("/2");
  };

  return (
    <Form>
      <FormGroup>
        <Input
          type="text"
          name="name"
          value={registerForm.name}
          placeholder="Enter name"
          onChange={changeHandler}
        />
        <Input
          type="email"
          name="email"
          value={registerForm.email}
          placeholder="Enter email"
          onChange={changeHandler}
        />
        <Input
          type="password"
          name="password"
          value={registerForm.password}
          placeholder="Enter password"
          onChange={changeHandler}
        />
        <FormGroup>
          <Input
            type="select"
            name="role"
            onChange={changeHandler}
          > 
            <option value="" disabled selected> Select a role</option>
            <option value="Instructor">Instructor</option>
            <option value="Client">Client</option>
          </Input>
        </FormGroup>
      </FormGroup>
      <Button onClick={submitHandler}>Register</Button>
    </Form>
  );
};

export default Register;
