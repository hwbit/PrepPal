import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/nav-bar/nav-bar';
import Home from './pages/home';
import LoginPage from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import NewRecipe from './pages/new-recipe';
<<<<<<< HEAD
import Recipe from './pages/recipe';
=======
import Collections from './pages/collections';
import EditProfile from './pages/edit-profile';
import Search from './pages/search';
>>>>>>> dev

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="new-recipe" element={<NewRecipe />} />
          <Route path="collections" element={<Collections />} />
          <Route path="search/:q" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
