import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Games from "./pages/Games";
import Leagues from "./pages/Leagues";
import Profile from "./pages/Profile";
import CreateLeague from "./pages/CreateLeague";
import Usernav from "./componenets/Usernav";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Header from "./componenets/Header";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (

    <BrowserRouter>
      {currentUser ? <Usernav /> : <Header />}
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="games" element={<Games />} />
          <Route path="leagues" element={<Leagues />} />
          <Route path="createleague" element={<CreateLeague />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
