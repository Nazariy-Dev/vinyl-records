import { Schema, model, models } from "mongoose"

const GenreSchema = new Schema({
   name: String
})

// add models.<modelName> to prevent error, that this model already exists
export default models && models.Genre || model('Genre', GenreSchema)

