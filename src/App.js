import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import {Switch, Route} from "react-router-dom";
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import InstructorAddClass from './components/InstructorAddClass';
import InstructorEditClass from './components/InstructorEditClass';


function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route path="/:id/editclass/:classId" component={InstructorEditClass}/>
      <Route path="/:id/addclass" component={InstructorAddClass}/>
      <Route path="/:id" component={UserProfile} />
    </Switch>
    </div>
  );
}

export default App;
