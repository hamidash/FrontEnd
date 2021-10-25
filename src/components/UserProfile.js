import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchClass, fetchUser } from "../actions";
import InstructorProfile from "./InstructorProfile";
import { Alert, Spinner } from "reactstrap";
import ClientProfile from "./ClientProfile";
import { withRouter } from "react-router";

function UserProfile(props) {
  // state = {
  //   userRole: this.props.user.role,
  // };

  // componentWillMount() {
  //   this.props.fetchUser(this.props.match.params.id);
  //   this.props.fetchClass(this.props.match.params.id);
  // }

  // const [userRole, setUserRole] = useState("");

  useEffect(()=>{
    props.fetchUser(props.match.params.id);
    props.fetchClass(props.match.params.id);
  },[])


  // render() {
    return (
      <div className="userProfile">
        {props.user.role === "Instructor" ? (
          <InstructorProfile
            user={props.user}
            classes={props.classes}
          />
        ) : props.user.role === "Client" ? (
          <ClientProfile user={props.user} classes={props.classes} />
        ) : (
          <div className="fetch-data">
            <Alert color="primary">Fetching user data</Alert>
            <Spinner type="grow" color="primary" />
          </div>
        )}
      </div>
    );
  // }
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
