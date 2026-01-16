import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

const RecipeDetail = ({ recipeFile }) => {
  const [data, setData] = useState(null);
  const [servings, setServings] = useState(0);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/recipes/${recipeFile}`)
      .then(res => res.text())
      .then(text => {
        const doc = yaml.load(text);
        setData(doc);
        setServings(doc.servings); // Set default from YAML
      });
  }, [recipeFile]);

  if (!data) return <p>Loading recipe...</p>;

  // Scaling Factor: (Desired / Original)
  const scale = servings / data.servings;

  return (
    <div className="recipe-card">
      <h2>{data.title}</h2>
      
      <label>Servings: </label>
      <input 
        type="number" 
        value={servings} 
        onChange={(e) => setServings(Math.max(1, e.target.value))} 
      />

      <h3>Ingredients</h3>
      <ul>
        {data.ingredients.map((ing, idx) => (
          <li key={idx}>
            {/* The Math: Original Amount * Scaling Factor */}
            <strong>{(ing.amount * scale).toFixed(1)} {ing.unit}</strong> {ing.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;