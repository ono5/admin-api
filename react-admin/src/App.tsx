// App.tsx
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import {RedirectToUsers} from './components/RedirectToUsers'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Links from './pages/Links'
import Products from './pages/products/Products'
import ProductForm from './pages/products/ProductForm'
import Orders from './pages/Orders'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={RedirectToUsers}></Route>
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
        <Route path={'/users'} exact component={Users}></Route>
        <Route path={'/users/:id/links'} component={Links}></Route>
        <Route path={'/products'} exact component={Products}></Route>
        <Route path={'/products/create'} component={ProductForm}></Route>
        <Route path={'/products/:id/edit'} component={ProductForm}></Route>
        <Route path={'/orders'} exact component={Orders}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
