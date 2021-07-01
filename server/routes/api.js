const {recipeDb} = require('../databaseService')
var express = require('express');
var router = express.Router();
const names = {
  allNames: null,
  lastUpdated: 0,
};

const cachingValues = async () => {
  allNames = await recipeDb.getNamesOfAllIngredients();
}
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

module.exports = router;
