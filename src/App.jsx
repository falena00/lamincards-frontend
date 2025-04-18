import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SerieList from "./components/SerieList";
import Cards from "./pages/Cards"; 
import Carta from "./pages/Carta";
import Login from './pages/Login';
import Register from './pages/register.jsx'; 
import Account from './pages/Account'; 


function App() {
  return (
    <>
      <Navbar /> {/* Sempre visibile */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<SerieList />} /> {/* Home */}
          <Route path="/serie/:setid" element={<Cards />} />
          <Route path="/carta/:setid/:cardid" element={<Carta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
