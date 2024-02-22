import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/nav-bar/nav-bar';
import Home from './pages/home';
import LoginPage from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import NewRecipe from './pages/new-recipe';

function App() {
  return (
    <div className="app">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="new-recipe" element={<NewRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
