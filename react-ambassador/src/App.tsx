// App.tsx
import { BrowserRouter, Route } from 'react-router-dom'
import ProductsFrontend from './pages/ProductsFrontend'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path={'/'} component={ProductsFrontend} />
    </BrowserRouter>
  );
}

export default App;
