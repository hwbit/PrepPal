import './app.css';
import Home from './pages/home';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import NavBar from './components/navbar/navbar';

function App() {
  return (
    <div className="app">
      <NavBar></NavBar>
      <Home></Home>
    </div>
  );
}

export default App;
