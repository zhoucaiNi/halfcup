import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import Leagues from "./pages/Leagues";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="games" element={<Games />} />
          <Route path="leagues" element={<Leagues />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
