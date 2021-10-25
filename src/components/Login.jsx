import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, NavLink } from "reactstrap";

function Login(props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginFail, setLoginFail] = useState("")

  const changeHandler = (e) => {
    const newLoginForm = {
      ...loginForm,
      [e.target.name]: e.target.value,
    };
    setLoginForm(newLoginForm);
  };

  const submitHandler = (e) => {
      e.preventDefault();
      axios
      .post(
        "https://build29-fitness-be.herokuapp.com/api/auth/login",
        loginForm
      )
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", `${res.data.token}`);
        props.history.push(`/${res.data.userData.user_id}`);
      })
      .catch((err) => {
        // console.error(err.response.data)
        setLoginFail(err.response.data.message)
        console.log(loginFail)
      });
   
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
      {loginFail ? <Alert color="danger">{loginFail} try again please</Alert>:""}
      <p>New to our page? </p>
      <NavLink href="/register">Register here</NavLink>
    </Form>
  );
}

export default Login;
