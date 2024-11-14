import { Schema, model, models } from "mongoose"

export const AdminModel = new Schema({
    email: {type: String, unique: true},
    password: String
})

export default models && models.Admin || model('Admin', AdminModel)


