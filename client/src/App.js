import './App.css';
import Admin from './Admin';
import User from './User';
import {Route, Link} from "react-router-dom";

function App() {
  return (
    <div >
      <div className="App">
        <label>Cowin 1.0</label>
      </div>
      <div className="Choice">
        <Link className = "Admin" to = "/admin">Admin</Link>
        <Link className = "Admin" to = "/user">User</Link>
      </div>
      <div>
      <Route exact path="/admin" component = {Admin}/>
      <Route exact path="/user" component = {User}/>
      </div>
      
    </div>
  );
}

export default App;
