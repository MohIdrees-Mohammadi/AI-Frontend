import './App.css';
import Details from './Pages/Detail';

import { LandingPage } from './Pages/LandingPage';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


function App() {
 
  return (
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/details" element={<Details />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
