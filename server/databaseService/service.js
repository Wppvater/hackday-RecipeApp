const mongoose = require('mongoose');
const {receptSchema, ingredientSchema, naringsvardeSchema} = require('./schemas');

const createConnection = async (databasePath) => {
  await mongoose.connect('mongodb://localhost/testDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  });
  return mongoose.connection;
}
const getAllIngredients = async () => {
  const MyModel = mongoose.model('ingredient', ingredientSchema);
  return await MyModel.find({});
}
const getNamesOfAllIngredients = async () => {
  const MyModel = mongoose.model('ingredient', ingredientSchema);
  return await MyModel.find({},'Namn');
}
const getIngredientsByQuery = async (queryObject) => {
  const MyModel = mongoose.model('ingredient', ingredientSchema);
  return await MyModel.find(queryObject);
}

const getNamesOfAllRecipes = async () => {
  const MyModel = mongoose.model('recept', receptSchema);
  return await MyModel.find({},'Namn');
}

const getRecipesByQuery = async (queryObject) => {
  const MyModel = mongoose.model('recept', receptSchema);
  return await MyModel.find(queryObject);
}

const postRecipe = async (recipe) => {
  const MyModel = mongoose.model('recept', receptSchema);
  const newRecipe = new MyModel();
  console.log(recipe);
  newRecipe.Namn = recipe.Namn;
  newRecipe.Ingredienser = recipe.Ingredienser;
  newRecipe.Effort = recipe.Effort;
  newRecipe.Tillagningstid = recipe.Tillagningstid;
  newRecipe.Instruktioner = recipe.Instruktioner;
  newRecipe.Naringsvarden = recipe.Naringsvarden;
  await newRecipe.save();
  return newRecipe;
}
module.exports = {
  createConnection, getAllIngredients, getIngredientsByQuery, postRecipe, getRecipesByQuery, getNamesOfAllIngredients,
  getNamesOfAllRecipes
}