import { Schema, model, models } from "mongoose"

const RecordModel = new Schema({
    name: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
    image: { type: String, required: true },
    unitsInAlbum: { type: Schema.Types.ObjectId, ref: 'Units', required: true },
    genres: [{ type: Schema.Types.ObjectId, required: true, ref: 'Genre' }],
    releaseDate: Date,
    songs: [{ type: String, required: false }],
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    priceId: { type: String, required: true },
    iFramelink: String,
    productId: { type: String, required: true }
})


export default models && models.Record || model('Record', RecordModel)

