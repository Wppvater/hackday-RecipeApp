import logo from './logo.svg';
import './App.css';
import RecipeCreationForm from './components/forms/RecipeCreationForm';
import RecipeSelectionForm from './components/forms/RecipeSelectionForm';
import GroceryList from './components/GroceryList';
import NavBar from './components/Navbar'
import React, { useEffect, useState } from 'react';
import {Route, Switch} from 'react-router-dom';
const axios = require('axios');

const App = () => {
  const [ingredients, setIngredients] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [groceryList, setGroceryList] = useState(null);
  const [addedNew, setAddedNew] = useState(null);
  useEffect(()=>{
    axios.get('http://localhost:9000/api/ingredients/names')
      .then(data => setIngredients(data.data));
    axios.get('http://localhost:9000/api/recipes/names')
      .then(data => setRecipes(data.data));
  }, [addedNew])
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Switch>
        <Route path='/recipes'>
          <RecipeCreationForm ingredients={ingredients} addedNew={setAddedNew}/>
        </Route>
        <Route path='/groceries'>
          <GroceryList groceries={groceryList}/>
        </Route>
        <Route path='/'>
          <RecipeSelectionForm recipes={recipes} setGroceryList={setGroceryList}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
