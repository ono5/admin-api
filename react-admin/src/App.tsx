// App.tsx
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import {RedirectToUsers} from './components/RedirectToUsers'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Links from './pages/Links'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToUsers}></Route>
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
        <Route path={'/users'} exact component={Users}></Route>
        <Route path={'/users/:id/links'} component={Links}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
