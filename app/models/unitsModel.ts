import { Schema, model, models } from "mongoose"

const UnitsSchema = new Schema({
   name: String
})


export default models && models.Units || model('Units', UnitsSchema)

