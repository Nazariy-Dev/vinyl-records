import { Schema, model, models } from "mongoose"

const AuthorSchema = new Schema({
    name: {type: String, unique: true}
})


export default models && models.Author || model('Author', AuthorSchema)


