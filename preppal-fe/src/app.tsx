import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import LoginPage from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import NewRecipe from './pages/new-recipe';
import Collections from './pages/collections';
import EditProfile from './pages/edit-profile';
import Search from './pages/search';
import Recipe from './pages/recipe';

function App() {
  return (
    <BrowserRouter basename="/PrepPal">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/new-recipe" element={<NewRecipe />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/:author/:titleUrl" element={<Recipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
