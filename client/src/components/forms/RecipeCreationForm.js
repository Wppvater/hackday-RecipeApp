import SelectInput from './inputs/SelectInput';
import React, { useEffect, useState } from 'react';
const axios = require('axios');

const RecipeCreationForm = ({ingredients, addedNew}) => {
  const [ingredientsObj, setIngredientsObj] = useState({});
  const [numberOfIngredients, setNumberOfIngredients] = useState(1);
  const [name, setName] = useState('');
  const [mealType, setMealType] = useState('Huvudrätt');
  const [mealEffort, setMealEffort] = useState('Hög');
  const updateIngredients = (value,key) => {
    const updatedIngredient = {};
    updatedIngredient[key] = value;
    setIngredientsObj(prevState => ({...prevState, ...updatedIngredient}));
  }
  const createLabelAndValue = (arrayItem) => {
    return {value: arrayItem, label:arrayItem};
  }
  const inputCreator = () => {
    if(!ingredients){
      return null;
    }
    let output = [];
    for(let i = 0; i<numberOfIngredients; i++){
      output.push(<SelectInput 
        options={ingredients.map(ingredient => ({value: ingredient.Namn, label: ingredient.Namn}))} 
        returnValue={updateIngredients}
        id={i} key={i}/>)
    }
    return output;
  }
  const addNewIngredientForm = e => {
    e.preventDefault();
    setNumberOfIngredients(prevState => prevState+1)
  }
  const handleNameChange = e => {
    setName(e.target.value);
  }
  const handleTypeChange = value => {
    setMealType(value);
  }
  const handleEffortChange = value => {
    setMealEffort(value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    const recipe = {};
    recipe.Ingredienser = Object.values(ingredientsObj);
    recipe.Namn = name;
    recipe.Typ = mealType;
    recipe.Effort = mealEffort;
    console.log(recipe)
    axios.post('http://localhost:9000/api/recipes', recipe).then(response => addedNew(response));
  }
  return(
    <div className='recipe-creation-form'>
      <form>
        <h2>Namn</h2>
        <input type='text' placeholder='Namn'onChange={handleNameChange}></input>
        <h2>Annan information</h2>
        <SelectInput 
          options={['Frukost', 'Huvudrätt', 'Tillbehör', 'Grönsaker', 'Dessert'].map(createLabelAndValue)} 
          returnValue={handleTypeChange}
          id={'mealType'}
          placeholder='Måltyp'/>
        <SelectInput 
          options={['Låg', 'Mellan', 'Hög'].map(createLabelAndValue)} 
          returnValue={handleEffortChange}
          id={'mealEffort'}
          placeholder='Tillagningssvårighet'/>
        <h2>Ingredienter:</h2>
        { ingredients ?
        inputCreator().map(input => input)
      : <p>Loading</p>}
        
      </form>
      <button onClick={addNewIngredientForm}>Lägg till ingredient</button>
      <button onClick={handleSubmit}>Skapa recept</button>
    </div>
  )
}

export default RecipeCreationForm;