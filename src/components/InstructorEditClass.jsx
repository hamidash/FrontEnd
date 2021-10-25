import React, { useEffect, useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { useHistory } from "react-router";

const InstructorEditClass = (props) => {
  const userId = props.computedMatch.params.id;
  const classId = props.computedMatch.params.classId;
  const history = useHistory();
  
  const [editClassForm, setEditClassForm] = useState({
    class_id: classId,
    name: "",
    date: "",
    start_time: "",
    duration_mins: "",
    intensity: "",
    location: "",
    max_size: "",
    user_id: userId,
  });

  const [editFail, setEditFail] = useState("");

  useEffect(() => {
    axiosWithAuth()
      .get(`/classes/user/${userId}/${classId}`)
      .then((res) => {
        setEditClassForm(res.data);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }, []);

  const changeHandler = (e) => {
    const newEditClassForm = {
      ...editClassForm,
      [e.target.name]: e.target.value,
    };
    setEditClassForm(newEditClassForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/classes/instructor/${userId}/${classId}`, editClassForm)
      .then((res) => {
       history.push(`/${userId}`);
      })
      .catch((err) => {
        setEditFail(err.response.data.message);
      });
  };


  return (
    <Form>
      <h2>Update Class</h2>
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
        <Button color="primary" size="sm" onClick={submitHandler}>
          {" "}
          Update
        </Button>
        {editFail ? <Alert color="warning">{editFail}, try again</Alert> : ""}
      </FormGroup>
    </Form>
  );
};

export default InstructorEditClass;
