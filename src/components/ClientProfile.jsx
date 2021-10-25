import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router";
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
  Spinner,
  UncontrolledAlert,
} from "reactstrap";
import axiosWithAuth from "../utils/axiosWithAuth";

const ClientProfile = (props) => {
  const { user, classes, logOut } = props;
  const history = useHistory();

  const [searchForm, setSearchForm] = useState({
    location: "",
    intensity: "",
  });

  const [isSearch, setIsSearch] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [searchSuccess, setSearchSuccess] = useState("");

  const changeHandler = (e) => {
    const newSearchForm = {
      ...searchForm,
      [e.target.name]: e.target.value,
    };
    setSearchForm(newSearchForm);
  };

  const searchHandler = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .get(
        `/classes/user/${user.user_id}/search?location=${searchForm.location}&intensity=${searchForm.intensity}`
      )
      .then((res) => {
        console.log(res);
        setSearchSuccess(true);

        setTimeout(() => {
          setSearchSuccess(false);
        }, 1000);

        setTimeout(() => {
          setSearchResults(res.data);
        }, 1000);

        setIsSearch(true);
      })
      .catch((err) => {
        console.log(err);
        setSearchSuccess(`Err: ${err.response.data.message}`);
        setIsSearch(false);
      });
  };

  const subscribeToClass = (e) => {
    e.preventDefault();
    const newClientClass = { user_id: user.user_id, class_id: e.target.value };
    axiosWithAuth()
      .post(`/classes/client`, newClientClass)
      .then((res) => {
        console.log("Client add class: ", res.data);
        history.go(0);
        setIsSearch(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const unsubscribeFromClass = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .delete(`/classes/client/${user.user_id}/${e.target.value}`)
      .then((res) => {
        console.log("Client delete class: ", res.data);
        history.go(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const showMyClasses = (e) => {
    setIsSearch(false);
  };

  return (
    <div className="client">
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
        <CardSubtitle>Role: {user.role}</CardSubtitle>
        <CardText>
          <Button color="link" size="sm" onClick={showMyClasses}>
            {" "}
            {`<Classes`}
          </Button>
        </CardText>
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
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Input>
            </FormGroup>
            <Button onClick={searchHandler}>Search</Button>
            {searchSuccess === true ? (
              <div>
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="success" />
              </div>
            ) : searchSuccess ? (
              <UncontrolledAlert color="danger">
                {searchSuccess}
              </UncontrolledAlert>
            ) : (
              ""
            )}
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
                      <Button
                        color="danger"
                        size="sm"
                        value={class_id}
                        onClick={unsubscribeFromClass}
                      >
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
                <div>
                  <h3>Search Results</h3>
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
                          onClick={subscribeToClass}
                        >
                          Add
                        </Button>
                      </ButtonGroup>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
