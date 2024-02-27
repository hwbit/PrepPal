import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './app.css';
import NavBar from './components/nav-bar/nav-bar';
import Collections from './pages/collections';
import EditProfile from './pages/edit-profile';
import Home from './pages/home';
import LoginPage from './pages/login';
import NewRecipe from './pages/new-recipe';
import Profile from './pages/profile';
import Search from './pages/search';
import Signup from './pages/signup';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
