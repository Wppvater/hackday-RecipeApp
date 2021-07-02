const {recipeDb} = require('../databaseService');
const dbHelpers = require('./dbQueryHelpers')
var express = require('express');
var router = express.Router();
const ingredientNames = {
  allNames: null,
  lastUpdated: 0,
};
const recipeNames = {
  allNames: null,
  lastUpdated: 0,
};

/* GET users listing. */
router.get('/ingredients', async function(req, res, next) {
  if(req.query.name){
    const dbQuery = {Namn: {$in: req.query.name.split('||')}}
    console.log(dbQuery);
    res.send(await recipeDb.getIngredientsByQuery(dbQuery));
  } else{
    res.send(await recipeDb.getAllIngredients());
  }
});
router.get('/ingredients/names', async function(req, res, next) {
  if(ingredientNames.lastUpdated < Date.now()-3600000){
    ingredientNames.allNames = await recipeDb.getNamesOfAllIngredients();
  }
  res.json(ingredientNames.allNames);
});
router.get('/recipes', async function(req, res, next) {
  if(req.query.name){
    const dbQuery = {Namn: {$in: req.query.name.split('||')}}
    console.log(dbQuery);
    const output = await recipeDb.getRecipesByQuery(dbQuery);
    console.log(output);
    res.send(await recipeDb.getRecipesByQuery(dbQuery));
  } else{
    res.send('Expected name query');
  }
});
router.get('/recipes/names', async function(req, res, next) {
  if(recipeNames.lastUpdated < Date.now()-3600000){
    recipeNames.allNames = await recipeDb.getNamesOfAllRecipes();
  }
  res.json(recipeNames.allNames);
});
router.post('/recipes', async function(req, res, next) {
  const newRecipe = await recipeDb.postRecipe(await dbHelpers.convertIncomingRecipe(req.body));
  res.send(newRecipe);
});

module.exports = router;
