// Import necessary React and TypeScript modules
import React from 'react';
import '../styles/global.css';
import NavBar from '../components/nav-bar/nav-bar';
import RecipeCatalog from '../components/recipe-catalog/recipe-catalog';

const Home: React.FC = () => {
  const [recipes, setRecipes] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fillRecipes = async () => {
      try {
        const req = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const fetchedRecipes = await fetch("http://localhost:9001/api/recipes/", req).then((res) => res.json());
        setRecipes(fetchedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fillRecipes();
  }, []);

  return (
    <><NavBar></NavBar>
      <div className="page">
        <h1>Explore</h1>
        <RecipeCatalog catalog={recipes}></RecipeCatalog>
      </div></>
  );
};

export default Home;
