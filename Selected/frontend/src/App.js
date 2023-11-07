import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Instructions from './pages/Instructions';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/about' element= { <About/> } />
        <Route path='/how-to-use' element= { <Instructions/> } />
        <Route path='/history' element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


