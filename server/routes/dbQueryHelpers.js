const {recipeDb} = require('../databaseService');

const convertIncomingRecipe = async recipe => {
  const newRecipe = recipe;
  const dbQuery = {Namn: {$in: recipe.Ingredienser}}
  const ingredienser = await recipeDb.getIngredientsByQuery(dbQuery)
  newRecipe.Ingredienser = ingredienser;
  let naringsvarden = [];
  ingredienser.forEach(ingrediens =>{
    ingrediens.Naringsvarden.forEach(naringsvarde => {
      const naringIndex = naringsvarden.findIndex(element => element.Namn === naringsvarde.Namn);
      if(naringIndex === -1){
        naringsvarden.push(naringsvarde);
      } else {
        naringsvarden[naringIndex].Varde = (convTNum(naringsvarden[naringIndex].Varde ) + convTNum(naringsvarde.Varde)).toString();
      }
    })
  })
  newRecipe.Naringsvarden = naringsvarden;
  return newRecipe;
}

const convTNum = str => {
  return Number(str.replace(',','.'));
}

module.exports = {
  convertIncomingRecipe
}