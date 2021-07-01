const mongoose = require('mongoose');
const {receptSchema, ingredientSchema, naringsvardeSchema} = require('./schemas')
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
const getIngredientsByQuery = async (queryObject) => {
  const MyModel = mongoose.model('ingredient', ingredientSchema);
  return await MyModel.find(queryObject);
}

module.exports = {
  createConnection, getAllIngredients, getIngredientsByQuery
}