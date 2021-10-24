import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";


const InstructorEditClass = (props) => {
    const userId = props.match.params.id;
    const classId = props.match.params.classId

const [editClassForm, setEditClassForm] = useState({
  class_id:classId,
  name: "",
  date: "",
  start_time: "",
  duration_mins: "",
  intensity: "",
  location: "",
  max_size: "",
  user_id: userId ,
});

useEffect(()=>{
    setEditClassForm({
        class_id:classId,
        name: "Yoga",
        date: "2021-11-01",
        start_time: "17:15",
        duration_mins: 90,
        intensity: "Beginner",
        location: "LA",
        max_size: 8,
        user_id: userId ,
    })
},[])


const changeHandler = (e) => {
  const newEditClassForm = {
    ...editClassForm,
    [e.target.name]: e.target.value,
  };
  setEditClassForm(newEditClassForm);
};

const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/${userId}`)
}

return (
  <Form>
    <h2>Edit Class</h2>
    <FormGroup>
      <Input
        type="text"
        name="name"
        value={editClassForm.name}
        placeholder="Class Name"
        onChange={changeHandler}
      />
      <Input
        type="date"
        name="date"
        value={editClassForm.date}
        placeholder="Date"
        onChange={changeHandler}
      />
      <Input
        type="time"
        min="00:00"
        max="23:59"
        name="start_time"
        value={editClassForm.start_time}
        placeholder="Class start time"
        onChange={changeHandler}
      />
      <Input
        type="number"
        name="duration_mins"
        value={editClassForm.duration_mins}
        placeholder="Class duration in minutes"
        onChange={changeHandler}
      />
      <Input
        type="text"
        name="intensity"
        value={editClassForm.intensity}
        placeholder="Class intesity"
        onChange={changeHandler}
      />
      <Input
        type="text"
        name="location"
        value={editClassForm.location}
        placeholder="Class location"
        onChange={changeHandler}
      />
      <Input
        type="number"
        name="max_size"
        value={editClassForm.max_size}
        placeholder="Class max size"
        onChange={changeHandler}
      />
      <Button color="primary" size="sm" onClick={submitHandler}> Add Class</Button>
    </FormGroup>
  </Form>
)
}

export default InstructorEditClass;