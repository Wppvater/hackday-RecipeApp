const {recipeDb} = require('../databaseService')
var express = require('express');
var router = express.Router();
const names = {
  allNames: null,
  lastUpdated: 0,
};

/* GET users listing. */
router.get('/livsmedel', async function(req, res, next) {
  if(req.query.name){
    const dbQuery = {Namn: {$in: req.query.name.split('||')}}
    console.log(dbQuery);
    res.send(await recipeDb.getIngredientsByQuery(dbQuery));
  } else{
    res.send(await recipeDb.getAllIngredients());
  }
});
router.get('/livsmedel/names', async function(req, res, next) {
  if(names.lastUpdated < Date.now()-3600000){
    names.allNames = await recipeDb.getNamesOfAllIngredients();
  }
  res.json(names.allNames);
});
router.get('/recipes', async function(req, res, next) {
  if(req.query.name){
    const dbQuery = {Namn: {$in: req.query.name.split('||')}}
    console.log(dbQuery);
    res.send(await recipeDb.getIngredientsByQuery(dbQuery));
  } else{
    res.send('Expected name query');
  }
});
router.get('/recipes/names', async function(req, res, next) {
  const names = await recipeDb.getNamesOfAllRecipes();
  res.json(names);
});
router.post('/recipes', async function(req, res, next) {
  const newRecipe = await recipeDb.postRecipe(req.body);
  res.send(newRecipe);
});

module.exports = router;
