// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Navbar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
