const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const naringsvardeSchema = new Schema({
  Enhet: String,
  Forkortning: String,
  Framtagningmetod: String,
  Kommentar: String,
  Metodtyp: String,
  Namn: String,
  Publikation: String,
  Referenstyp: String,
  SenastAndrad: String,
  Ursprung: String,
  Nummer: String,
  ViktGram: String,
})
const ingredientSchema = new Schema({
  Huvudgrupp: String,
  Namn: String,
  Nummer: String,
  ViktGram: String,
  Naringsvarden: [naringsvardeSchema],
});
const receptSchema = new Schema({
  Namn: String,
  Ingredienser: [ingredientSchema],
  Portioner: String,
  Naringsvarden: [naringsvardeSchema],
  Effort: String,
  Tillagingstid: String,
  Instruktioner: [String],
})

module.exports = {
  receptSchema, ingredientSchema, naringsvardeSchema
}