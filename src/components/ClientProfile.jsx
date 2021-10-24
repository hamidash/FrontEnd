import React, { Component, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardSubtitle,
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  CardTitle,
} from "reactstrap";

const ClientProfile = (props) => {
  const { user, classes } = props;

  const [searchForm, setSearchForm] = useState({
    location: "",
    intensity: "",
  });

  const [isSearch, setIsSearch] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const changeHandler = (e) => {
    const newSearchForm = {
      ...searchForm,
      [e.target.name]: e.target.value,
    };
    setSearchForm(newSearchForm);
  };

  const searchHandler = (e) => {
    e.preventDefault();
   
    setSearchResults([
      {
        class_id: 1,
        name: "Tennis",
        date: "10-01-21",
        start_time: "15:00",
        duration_mins: 45,
        intensity: "beginner",
        location: "LA",
        max_size: 10,
        user_id: 2,
      },
      {
        class_id: 3,
        name: "Voleyball",
        date: "10-01-30",
        start_time: "14:00",
        duration_mins: 30,
        intensity: "beginner",
        location: "LA",
        max_size: 9,
        user_id: 2,
      },
    ]);

    setIsSearch(true);
  
  };

  return (
    <div className="client">
      <Card key={`user ${props.user.id}`} className="user">
        <CardHeader>Welcome back, {user.name}</CardHeader>
        <CardImg
          top
          width="80%"
          src="https://i.pravatar.cc/300"
          alt="User image"
        />
        <CardSubtitle>Role: {user.role}</CardSubtitle>
      </Card>
      <div className="client bottom">
        <section className="search">
          <Form>
            <FormGroup>
              <Input type="select" name="location" onChange={changeHandler}>
                <option value="" disabled selected>
                  Select city
                </option>
                <option value="LA">Los Angelos</option>
                <option value="SF">San Francisco</option>
                <option value="LV">Las Vegas</option>
              </Input>
              <Input type="select" name="intensity" onChange={changeHandler}>
                <option value="" disabled selected>
                  Select intensity
                </option>
                <option value="LA">Beginner</option>
                <option value="SF">Intermediate</option>
                <option value="LV">Advanced</option>
              </Input>
            </FormGroup>
            <Button onClick={searchHandler}>Search</Button>
          </Form>
        </section>
        {!isSearch ? (
          <section className="client-classes">
           <h2>My Classes</h2>
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
                      <Button color="danger" size="sm" value={class_id}>
                        X
                      </Button>
                    </ButtonGroup>
                  </CardBody>
                </Card>
              );
            })}
          </section>
        ) : (
          <section className="search results">
            <h2>Search Results</h2>
           
            {searchResults.map((result) => {
              const {
                class_id,
                name,
                start_time,
                date,
                duration_mins,
                intensity,
                location,
                max_size,
              } = result;
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
                      <Button color="danger" size="sm" value={class_id}>
                        Add
                      </Button>
                    </ButtonGroup>
                  </CardBody>
                </Card>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
