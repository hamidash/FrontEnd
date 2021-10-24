import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormGroup, Input, NavLink } from "reactstrap";

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const newLoginForm = {
      ...loginForm,
      [e.target.name]: e.target.value,
    };
    setLoginForm(newLoginForm);
  };

  const submitHandler = (e) => {
      e.preventDefault();
    //   axios
    //     .post("", loginForm)
    //     .then((res) => {})
    //     .catch((err) => console.log(err.response));
    props.history.push('/1')
   
    };

  return (
    <Form className="login form">
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={loginForm.email}
          placeholder="Enter email"
          onChange={changeHandler}
        />
        <Input
          type="password"
          name="password"
          value={loginForm.password}
          placeholder="Enter password"
          onChange={changeHandler}
        />
      </FormGroup>
      <Button color="primary" size="sm" onClick={submitHandler}>Login</Button>
      <p>New to our page? </p>
      <NavLink href="/register">Register here</NavLink>
    </Form>
  );
}

export default Login;
