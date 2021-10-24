import React, { Component } from "react";
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
} from "reactstrap";


const InstructorProfile = (props) => {
  const { user, classes } = props;

  const history = useHistory();
  const url = useRouteMatch()

  console.log(history);
  console.log(url);

  return (
    <div className="instructor">
      <Card key={`user ${props.user.id}`} className="user">
        <CardHeader>Welcome back, {user.name}</CardHeader>
        <CardImg
          top
          width="80%"
          src="https://i.pravatar.cc/300"
          alt="User image"
        />
        <CardBody>
          <CardSubtitle>Role: {user.role} </CardSubtitle>
          <Button color="primary" size="sm">
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
         } = aClass
          return (
            <Card key={`class ${class_id}`}>
              <CardHeader>{name} in {location}</CardHeader>
              <CardImg
                top
                width="50%"
                height="30%"
                src="https://www.active.com/Assets/Fitness/group-fitness-benefits.jpg"
                alt="Class image"
              />
              <CardBody>
              <CardText>Duration: {duration_mins} mins</CardText>
              <CardText>Begins: {date} {start_time} </CardText>
              <CardText>Intensity: {intensity}</CardText>
              <CardText>Max capacity: {max_size}</CardText>
              <ButtonGroup>
                <Button color="danger" size="sm" value={class_id} >
                  X
                </Button>
                <Button color="warning" size="sm"  value={class_id}>
                  &#9998;
                </Button>
              </ButtonGroup>
              </CardBody>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default InstructorProfile;
