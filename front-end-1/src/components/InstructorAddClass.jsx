import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";

const InstructorAddClass = (props) => {
  const userId = props.match.params.id

  const [addClassForm, setAddClassForm] = useState({
    name: "",
    date: "",
    start_time: "",
    duration_mins: "",
    intensity: "",
    location: "",
    max_size: "",
    user_id: userId ,
  });

  const changeHandler = (e) => {
    const newClassForm = {
      ...addClassForm,
      [e.target.name]: e.target.value,
    };
    setAddClassForm(newClassForm);
  };

  const submitHandler = (e) => {
      e.preventDefault();
      props.history.push(`/${userId}`)
  }

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
        <Input
          type="text"
          name="intensity"
          value={addClassForm.intensity}
          placeholder="Class intesity"
          onChange={changeHandler}
        />
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
        <Button color="primary" size="sm" onClick={submitHandler}> Add Class</Button>
      </FormGroup>
    </Form>
  );
};

export default InstructorAddClass;
