import { Navbar, Header, Footer } from './layouts';
import { Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Header />} />
      </Routes>
    </div>
  );
};

export default App;
