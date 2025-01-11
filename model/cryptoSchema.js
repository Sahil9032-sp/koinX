import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const cryptoSchema = new mongoose.Schema({
    coinId: { type: String, required: true },
  name: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  fetchedAt: { type: Date, default: Date.now },
})

//apply to uniqueValidator plugin to user Schema
cryptoSchema.plugin(uniqueValidator)

const cryptoSchemaModel = mongoose.model('crypto_collection',cryptoSchema);
export default cryptoSchemaModel;