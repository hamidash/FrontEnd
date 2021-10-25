import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardSubtitle,
  ButtonGroup,
  Alert,
} from "reactstrap";
import axiosWithAuth from "../utils/axiosWithAuth";

const InstructorProfile = (props) => {
  const [deleteStatus, setDeleteStatus] = useState("");

  const { user, classes, logOut } = props;
  const history = useHistory();
  const url = useRouteMatch();

  const addClass = (e) => {
    e.preventDefault();
    history.push(`/${user.user_id}/addclass`);
  };

  const editClass = (e) => {
    e.preventDefault();
    history.push(`/${user.user_id}/editclass/${e.target.value}`);
  };

  const deleteClass = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/classes/instructor/${user.user_id}/${e.target.value}`)
      .then((res) => {
        console.log(res);
        setDeleteStatus(res.data.message);
        setTimeout(() => {
          history.go(0);
        }, 2000);
      })
      .catch((err) => {});
  };
  return (
    <div className="instructor">
      <Card key={`user ${props.user.id}`} className="user">
        <CardHeader>
          Welcome back, {user.name}
          <Button  color="link" size="sm" onClick={logOut}>
            Log Out
          </Button>
        </CardHeader>
        <CardImg
          top
          width="80%"
          src="https://i.pravatar.cc/300"
          alt="User image"
        />
        <CardBody>
          <CardSubtitle>Role: {user.role} </CardSubtitle>
          <Button color="primary" size="sm" onClick={addClass}>
            Add Class
          </Button>
        </CardBody>
      </Card>

      <section className="instructor bottom">
        {classes.map((aClass) => {
          const {
            class_id,
            name,
            start_time,
            date,
            duration_mins,
            intensity,
            location,
            max_size,
          } = aClass;
          return (
            <Card key={`class ${class_id}`}>
              <CardHeader>
                {name} in {location}
              </CardHeader>
              <CardImg
                top
                width="50%"
                height="30%"
                src="https://www.active.com/Assets/Fitness/group-fitness-benefits.jpg"
                alt="Class image"
              />
              <CardBody>
                <CardText>Duration: {duration_mins} mins</CardText>
                <CardText>
                  Begins: {date} {start_time}{" "}
                </CardText>
                <CardText>Intensity: {intensity}</CardText>
                <CardText>Max capacity: {max_size}</CardText>
                <ButtonGroup>
                  <Button
                    color="danger"
                    size="sm"
                    value={class_id}
                    onClick={deleteClass}
                  >
                    X
                  </Button>
                  <Button
                    color="warning"
                    size="sm"
                    value={class_id}
                    onClick={editClass}
                  >
                    &#9998;
                  </Button>
                </ButtonGroup>
                {deleteStatus ? <Alert color="info">{deleteStatus}</Alert> : ""}
              </CardBody>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default InstructorProfile;
