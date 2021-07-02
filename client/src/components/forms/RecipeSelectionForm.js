import SelectInput from './inputs/SelectInput';
import React, { useEffect, useState } from 'react';
const axios = require('axios');

const RecipeSelectionForm = ({recipes, setGroceryList}) => {
  const [recipesObj, setRecipesObj] = useState({});
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [mealSchema, setMealSchema] = useState(null);
  const updateRecipes = (value,key) => {
    const updatedRecipes = {};
    updatedRecipes[key] = value;
    setRecipesObj(prevState => ({...prevState, ...updatedRecipes}));
  }
  const addNewDay = e => {
    e.preventDefault();
    setNumberOfDays(prevState => prevState+1)
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
    const schema = {};
    schema.recept = Object.values(recipesObj);
    schema.meals = await axios.get(`http://localhost:9000/api/recipes?name=${schema.recept.join('||')}`).then(data => data.data);
    console.log(schema.meals);
    setMealSchema(schema);
}
  const convTNum = str => {
    return Number(str.replace(',','.'));
  }
  const nutrientsCreator = () => {
    let naringsvarden = [];
    mealSchema.meals.forEach(meal =>{
      meal.Naringsvarden.forEach(naringsvarde => {
        const naringIndex = naringsvarden.findIndex(element => element.Namn === naringsvarde.Namn);
        if(naringIndex === -1){
          naringsvarden.push({Namn: naringsvarde.Namn, Varde: naringsvarde.Varde, Enhet: naringsvarde.Enhet});
        } else {
          naringsvarden[naringIndex].Varde = (convTNum(naringsvarden[naringIndex].Varde ) + convTNum(naringsvarde.Varde)).toString();
        }
      })
    })
    return naringsvarden;
  }
  const dayCreator = () => {
    let output = [];
    for(let i = 0; i < numberOfDays; i++){
      output.push(
        <div>
          <h2>Dag {i+1}</h2>
          <h3>Frukost</h3>
            <SelectInput 
              options={recipes.map(recipe => ({value: recipe.Namn, label: recipe.Namn}))} 
              returnValue={updateRecipes}
              id={'frukost'+i} key={'frukost'+i}/>
          <h3>Lunch</h3>
          <SelectInput 
              options={recipes.map(recipe => ({value: recipe.Namn, label: recipe.Namn}))} 
              returnValue={updateRecipes}
              id={'lunch'+i} key={'lunch'+i}/>
          <h3>Middag</h3>
          <SelectInput 
              options={recipes.map(recipe => ({value: recipe.Namn, label: recipe.Namn}))} 
              returnValue={updateRecipes}
              id={'middag'+i} key={'middag'+i}/>
        </div>
      )
    }
    return output;
  }
  const createGroceries = () => {
    const groceries = [];
    mealSchema.meals.forEach(meal => {
      meal.Ingredienser.forEach(ingrediens => {
        const ingredIndex = groceries.findIndex(element => element.Namn === ingrediens.Namn);
        if(ingredIndex === -1){
          groceries.push({Namn: ingrediens.Namn, Varde: ingrediens.ViktGram, Enhet: 'g'});
        } else {
          console.log(ingrediens);
          groceries[ingredIndex].Varde = (convTNum(groceries[ingredIndex].Varde ) + convTNum(ingrediens.ViktGram)).toString();
        }
      })
    })
    setGroceryList(groceries);
  }
  return(
    <div className='schedule-creation-form'>
      <form>
        { recipes ?
        dayCreator()
      : <p>Loading</p>}
        
      </form>
      <button onClick={addNewDay}>Lägg till dag</button>
      {submitted ?
        <button onClick={createGroceries}>Skapa inköpslista</button>
        :<button onClick={handleSubmit}>Skapa schema</button>
        }
      <div>
      {mealSchema ? 
        <div className='nutrients-list'>
          <h2>Näringsämnen</h2>
        <ul >
            {nutrientsCreator().map(nutrient => (
              <li>{nutrient.Namn}: {nutrient.Varde}{nutrient.Enhet}</li>
            ))}
        </ul>
        </div>
        : ''
        }
      </div>
      
    </div>
  )
}

export default RecipeSelectionForm;