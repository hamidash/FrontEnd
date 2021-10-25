import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchClass, fetchUser } from "../actions";
import InstructorProfile from "./InstructorProfile";
import { Alert, Spinner, Button } from "reactstrap";
import ClientProfile from "./ClientProfile";
import { useHistory } from "react-router";


function UserProfile(props) {
 
  useEffect(()=>{
    props.fetchUser(props.computedMatch.params.id);
    props.fetchClass(props.computedMatch.params.id);
  },[])
  const history = useHistory();

  const logOut = (e) => {
    localStorage.removeItem("token");
    history.go(0);
  }

  
    return (
      <div className="userProfile">
        {props.user.role === "Instructor" ? (
          <InstructorProfile
            user={props.user}
            classes={props.classes}
            logOut={logOut}
          />
        ) : props.user.role === "Client" ? (
          <ClientProfile user={props.user} classes={props.classes} logOut={logOut}/>
        ) : (
          <div className="fetch-data">
            <Alert color="primary">Fetching user data</Alert>
            <Spinner type="grow" color="primary" />
          </div>
        )}
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.class,
    isFetching: state.isFetching,
    user_error: state.user_error,
    class_error: state.class_error,
  };
};

export default connect(mapStateToProps, { fetchClass, fetchUser })(UserProfile);
