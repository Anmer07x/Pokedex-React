import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorite';


const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:name" element={<Details />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
   </Router>
  );
};

export default App
