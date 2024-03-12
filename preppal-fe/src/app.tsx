import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import LoginPage from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Collections from './pages/collections';
import EditProfile from './pages/edit-profile';
import Search from './pages/search';
import Recipe from './pages/recipe';
import CreateRecipe from './pages/create-recipe';
import RecipeCalendar from './pages/recipe-calendar';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="new-recipe" element={<CreateRecipe />} />
          <Route path="collections" element={<Collections />} />
          <Route path="search/:titleQuery?" element={<Search />} />
          <Route path="recipe/:recipeId" element={<Recipe />} />
          <Route path="calendar" element={<RecipeCalendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
