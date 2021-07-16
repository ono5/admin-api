// App.tsx
import { BrowserRouter, Route } from 'react-router-dom'
import ProductsFrontend from './pages/ProductsFrontend'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path={'/'} exact component={ProductsFrontend} />
      <Route path={'/login'} component={Login} />
      <Route path={'/register'} component={Register} />
    </BrowserRouter>
  );
}

export default App;
