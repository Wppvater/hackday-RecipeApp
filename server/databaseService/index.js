const {createConnection, getAllIngredients, getIngredientsByQuery, postRecipe, getRecipesByQuery, getNamesOfAllIngredients } = require('./service');
const startDB = async () => {
  await createConnection('mongodb://localhost/testDB');
}
const recipeDb = {
  getAllIngredients, getIngredientsByQuery, postRecipe, getRecipesByQuery, getNamesOfAllIngredients
}

module.exports = {
  startDB, recipeDb
}