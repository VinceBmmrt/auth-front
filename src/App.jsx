// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Profil from "./Profil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;
