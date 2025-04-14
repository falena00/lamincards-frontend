import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SerieList from "./components/SerieList";
import Cards from "./pages/Cards"; 

function App() {
  return (
    <>
      <Navbar /> {/* Sempre visibile */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<SerieList />} /> {/* Home */}
          <Route path="/serie/:id" element={<Cards />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
