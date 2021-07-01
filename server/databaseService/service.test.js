const {createConnection, getAllIngredients, getIngredientsByQuery, postRecipe, getRecipesByQuery } = require('./service');
describe('databaseTests', () => {
  let connection;
  beforeAll( async () => {
    connection = await createConnection('mongodb://localhost/testDB');
  })
  afterAll( () => {
    connection.close();
  })
  test.skip('can get all documents', async () => {
    const ingredients = await getAllIngredients();
    expect(ingredients).toHaveLength(2161);
  })
  test('can get a document by name', async () => {
    const ingredient = await getIngredientsByQuery({Namn: 'Nöt talg'});
    expect(ingredient).toHaveLength(1);
    expect(ingredient[0].Namn).toEqual('Nöt talg');
    expect(ingredient[0].Naringsvarden).toHaveLength(55);
    console.log(ingredient);
  })
  test('can create a new recipe name', async () => {
    const ingredients = await getIngredientsByQuery({Namn: {$in: ['Nöt talg', 'Smör fett 80%', 'Mimosasallad']}});
    const ingredient = await postRecipe({Namn: 'Nytt recept', Ingredienser: ingredients});
    console.log(ingredient);
  })
  test('can get a recipe by name', async () => {
    const ingredients = await getRecipesByQuery({Namn: 'Nytt recept'});
    console.log(ingredients);
  })
})