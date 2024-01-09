import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Sign from './Components/Sign';
import User from './Components/User';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/sign" element={<Sign />} />
      <Route path='/user' element={<User />} />
    </Routes>
  );
}

export default App;
