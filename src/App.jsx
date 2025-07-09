import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./componentes/LoginPage";
import HomePage from "./componentes/HomePage";

const App = () => (
  <Router basename="/escaperoomnoja">
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
