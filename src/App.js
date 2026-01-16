import './App.css';
import { useState } from 'react';
import RecipeDetail from './RecipeDetail'; 
import recipeList from './recipes-index.json'; 

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="container">
      <header>
        <h1 onClick={() => setSelectedRecipe(null)} style={{cursor: 'pointer'}}>
          📖 My Digital Cookbook
        </h1>
      </header>

      <hr />

      {!selectedRecipe ? (
        <nav>
          <h2>My Recipes</h2>
          <ul>
            {recipeList.map((fileName) => (
              <li key={fileName} style={{ margin: '10px 0' }}>
                <button onClick={() => setSelectedRecipe(fileName)}>
                  {fileName.replace('.yaml', '').replace(/-/g, ' ')}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <div>
          <button onClick={() => setSelectedRecipe(null)}>← Back to List</button>
          <RecipeDetail recipeFile={selectedRecipe} />
        </div>
      )}
    </div>
  );
}

export default App;