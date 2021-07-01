const {createConnection, getAllIngredients, getIngredientsByQuery, postRecipe, getRecipesByQuery, getNamesOfAllIngredients,
  getNamesOfAllRecipes } = require('./service');
const startDB = async () => {
  await createConnection('mongodb://localhost/testDB');
}
const recipeDb = {
  getAllIngredients, getIngredientsByQuery, postRecipe, getRecipesByQuery, getNamesOfAllIngredients, getNamesOfAllRecipes
}

module.exports = {
  startDB, recipeDb
}