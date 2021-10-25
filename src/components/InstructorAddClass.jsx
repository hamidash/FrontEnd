import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { useHistory } from "react-router";

const InstructorAddClass = (props) => {
  const userId = props.computedMatch.params.id;
  const history = useHistory()
  const [addClassForm, setAddClassForm] = useState({
    name: "",
    date: "",
    start_time: "",
    duration_mins: "",
    intensity: "",
    location: "",
    max_size: "",
    user_id: userId,
  });

  const [addFail, setAddFail] = useState("");

  const changeHandler = (e) => {
    const newClassForm = {
      ...addClassForm,
      [e.target.name]: e.target.value,
    };
    setAddClassForm(newClassForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/classes/instructor`, addClassForm)
      .then((res) => {
        console.log(res.data);
        history.push(`/${userId}`);
      })
      .catch((err) => {
        console.log(err);
        setAddFail(err.response.data.message);
      });
  };

  return (
    <Form>
      <h2>Add New Class</h2>
      <FormGroup>
        <Input
          type="text"
          name="name"
          value={addClassForm.name}
          placeholder="Class Name"
          onChange={changeHandler}
        />
        <Input
          type="date"
          name="date"
          value={addClassForm.date}
          placeholder="Date"
          onChange={changeHandler}
        />
        <Input
          type="time"
          min="00:00"
          max="23:59"
          name="start_time"
          value={addClassForm.start_time}
          placeholder="Class start time"
          onChange={changeHandler}
        />
        <Input
          type="number"
          name="duration_mins"
          value={addClassForm.duration_mins}
          placeholder="Class duration in minutes"
          onChange={changeHandler}
        />
        <Input type="select" name="intensity" onChange={changeHandler}>
          <option value="" disabled selected>
            Select intensity
          </option>
          <option value="LA">Beginner</option>
          <option value="SF">Intermediate</option>
          <option value="LV">Advanced</option>
        </Input>
        <Input
          type="text"
          name="location"
          value={addClassForm.location}
          placeholder="Class location"
          onChange={changeHandler}
        />
        <Input
          type="number"
          name="max_size"
          value={addClassForm.max_size}
          placeholder="Class max size"
          onChange={changeHandler}
        />
        <Button color="primary" size="sm" onClick={submitHandler}>
          {" "}
          Add Class
        </Button>
        {addFail ? <Alert color="warning">{addFail}, try again</Alert> : ""}
      </FormGroup>
    </Form>
  );
};

export default InstructorAddClass;
