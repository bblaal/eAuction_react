import './App.css';
import Header from './web-component/header/Header'
import Login from './web-component/auth/Login'
import Signup from './web-component/auth/Signup'
import Home from './web-component/Home'
import Book from './web-component/Book'
import Bidcenter from './web-component/bidCenter/Bidcenter';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import FranchiseeListView from './web-component/bidCenter/FranchiseeListView';
import PlayerListView from './web-component/bidCenter/PlayersListView';

function App() {
  return (
    <div className="App">
      <Router path="/">
        <Header />
        <Switch>

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/playerListView">
            <PlayerListView />
          </Route>
          <Route path="/franchiseeList">
            <FranchiseeListView />
          </Route>
          <Route path="/bidcenter">
            <Bidcenter />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
