import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
    console.log("PrivRoute props: ",{...props}, " PrivRoute compon: ", {Component})
  
    return(
    <Route
    {...props}
    render={() => {
      if (!localStorage.getItem("token")) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
  )
  
};

export default PrivateRoute;
