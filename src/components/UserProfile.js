import React from "react";
import { connect } from "react-redux";
import { fetchClass, fetchUser } from "../actions";
import InstructorProfile from "./InstructorProfile";
import { Alert, Spinner } from "reactstrap";
import ClientProfile from "./ClientProfile";


const UserProfile = (props) => {
  return (
    <div className="userProfile">
      {props.user.role === "Instructor" ? (
        <InstructorProfile user={props.user} classes={props.classes} />
      ) : props.user.role === "Client" ? (
        <ClientProfile user={props.user} classes={props.classes}/>
      ) : (
        <div className="fetch-data">
          <Alert color="primary">Fetching user data</Alert>
          <Spinner type="grow" color="primary" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    classes: state.class,
    isFetching: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { fetchClass, fetchUser })(UserProfile);
